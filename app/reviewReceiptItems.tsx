import React, { useEffect, useState } from "react";
import { Linking, Platform, StyleSheet } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Form, View, XStack, Text, styled, YStack } from "tamagui";
import { useAppSelector } from "@/hooks";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch } from "@/hooks";
import {
  receiptItemsActions,
  receiptItemsSelectors,
} from "@/store/receiptItems/slice";
import { appActions, appSelectors } from "@/store/app/slice";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import {
  getSubTotalFromItems,
  getTotalFromItems,
  parseTextFromImage,
} from "@/utils/textRecognition";
import {
  SubCategoryItem,
  ReceiptItem,
  Categories,
  Category,
  ReviewReceiptItem,
} from "@/types";
import { ReviewRowItem } from "@/components/ReviewRowItem";
import { NumericFormat } from "react-number-format";
import { tokens } from "@tamagui/config/v3";
import { getChatResponseThroughAPI } from "@/utils/ollama";
import { Notice } from "@/components/Notice";
import moment from "moment";
import { DATE_FORMAT } from "@/constants/app";
import { getFoodCategory } from "@/utils/fdc";
import { DOMAINS } from "@/constants/endpoint";
import { AppButton } from "@/components/AppButton";
import { AppSpinner } from "@/components/AppSpinner";
import { ReviewReceiptItemCard } from "@/components/ReviewReceiptItemCard";
import { isPureLineString } from "@/utils";

const TotalTitleText = styled(Text, {
  fontSize: 20,
  fontWeight: "bold",
  color: "color",
});

export default function ReviewReceiptItems() {
  const router = useRouter();
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const [loadingSubCategories, setLoadingSubCategories] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [itemTotal, setItemTotal] = useState<number>(0);
  const receiptCategory = useAppSelector(
    receiptItemsSelectors.receiptCategorySelector,
  );

  const emptyItem: ReviewReceiptItem = {
    id: "newItem",
    name: "",
    price: "",
    category: receiptCategory,
  };

  const [newItem, setNewItem] = useState<ReviewReceiptItem>(emptyItem);
  const imageUri = useAppSelector(receiptItemsSelectors.imageUriSelector);
  const scanningReceipt = useAppSelector(
    receiptItemsSelectors.scanningReceiptSelector,
  );
  const receiptItems = useAppSelector(
    receiptItemsSelectors.receiptItemsSelector,
  );
  const subCategories = useAppSelector(
    receiptItemsSelectors.subCategoriesSelector,
  );
  const appCategories = useAppSelector(appSelectors.subCategoriesSelector);
  const total = useAppSelector(receiptItemsSelectors.totalSelector);
  const monthlyHistory = useAppSelector(appSelectors.monthlyHistorySelector);
  const currentMonth = moment().format(DATE_FORMAT);

  const convertImageToText = async (imageUri: string) => {
    appDispatch(receiptItemsActions.updateScanningReceipt(true));
    appDispatch(receiptItemsActions.deleteItems());
    try {
      const result = await TextRecognition.recognize(imageUri);
      const parsedData = parseTextFromImage(result, receiptCategory);
      const total = getTotalFromItems(parsedData);
      const subTotal = getSubTotalFromItems(parsedData);
      const lines = result.blocks
        .map((block) => block.lines)
        .flat()
        .map((line) => line.text)
        .filter((line) => isPureLineString(line));
      const uniqueLines = [...new Set(lines)];
      const filteredItems: ReceiptItem[] = [];
      parsedData.forEach((item) => {
        if (Number(item.price) !== total && Number(item.price) !== subTotal) {
          filteredItems.push(item);
          if (!uniqueLines.includes(item.name)) {
            uniqueLines.push(item.name);
          }
        }
      });
      setItemTotal(
        Number(
          filteredItems
            .reduce((acc, item) => acc + Number(item.price), 0)
            .toFixed(2),
        ),
      );

      appDispatch(receiptItemsActions.addLines(uniqueLines));
      appDispatch(receiptItemsActions.updateTotal(total));
      appDispatch(receiptItemsActions.addAllItems(parsedData));
      appDispatch(receiptItemsActions.addItems(filteredItems));
      appDispatch(receiptItemsActions.updateScanningReceipt(false));
    } catch (e) {
      console.error("Error while recognizing text", e);
    }
  };

  const loadCategoriesFromModel = async (filteredItems: ReceiptItem[]) => {
    try {
      setLoadingSubCategories(true);
      const aiCategories = appCategories.map((category) => category.name);
      const defaultCategories = [
        "Bakery",
        "Baking goods",
        "Beverage",
        "Canned",
        "Cleaners",
        "Condiment",
        "Culinary",
        "Dairy",
        "Deli",
        "Electronics",
        "Frozen food",
        "Meat",
        "Other",
        "Paper goods",
        "Personal care",
        "Produce",
        "Snack",
      ];
      defaultCategories.forEach((category) => {
        if (!aiCategories.includes(category)) {
          aiCategories.push(category);
        }
      });
      const categories = await getChatResponseThroughAPI(`
        - Categories these items ${filteredItems.map((item) => `"${item.name}"`).join(", ")}
        - Use the following categories: ${aiCategories.join(", ")}
        - Use "Other" if you cannot figure out the category.
        - Return the response in a JSON format with the item name as the key and the category as the value.
        - Respond only with valid JSON. Do not write an introduction or summary.
      `);
      const categorizedData: Record<string, string> = JSON.parse(
        categories.message.content,
      );
      const _categories: SubCategoryItem[] = [];
      const updatedItems = filteredItems.map((item) => {
        const category = categorizedData[item.name];
        const _category = category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "Other";
        item.subCategory = _category;
        _categories.push({ name: _category, price: item.price });
        return item;
      });
      appDispatch(receiptItemsActions.addSubCategories(_categories));
      appDispatch(receiptItemsActions.updateItems(updatedItems));
    } catch (e) {
      console.error("Error while getting chat response", e);
      setError(`Error while getting chat response - ${e}`);
    } finally {
      setLoadingSubCategories(false);
    }
  };

  const loadCategoriesFromFDC = async (filteredItems: ReceiptItem[]) => {
    try {
      setLoadingSubCategories(true);
      const _subCategories: SubCategoryItem[] = [];
      const items = filteredItems.map((item) => item.name);
      const promises = items.map((item) => getFoodCategory(item));
      const responses = await Promise.allSettled(promises);
      let subCategorizedData: Record<string, string> = {};
      responses.forEach((response) => {
        if (response.status === "fulfilled" && response.value) {
          subCategorizedData = { ...subCategorizedData, ...response.value };
        }
      });
      const updatedItems = filteredItems.map((item) => {
        const subCategory = subCategorizedData[item.name];
        const _subCategory = subCategory
          ? subCategory.charAt(0).toUpperCase() + subCategory.slice(1)
          : "Other";
        item.subCategory = _subCategory;
        if (!_subCategories.map((c) => c.name).includes(_subCategory)) {
          _subCategories.push({ name: _subCategory, price: item.price });
        }
        return item;
      });
      appDispatch(
        receiptItemsActions.addSubCategories([...new Set(_subCategories)]),
      );
      appDispatch(receiptItemsActions.updateItems(updatedItems));
    } catch (e) {
      console.error("Error while getting response from FDC", e);
      setError(`Error while getting response from FDC - ${e}`);
    } finally {
      setLoadingSubCategories(false);
    }
  };

  const onSubmit = () => {
    appDispatch(receiptItemsActions.deleteItems());
    appDispatch(receiptItemsActions.updateTotal(0));
    appDispatch(appActions.addSubCategories(subCategories));

    const history = { ...(monthlyHistory[currentMonth] || {}) };
    const _receiptItems = [...(history.items || []), ...receiptItems];
    const categoryTotal = { ...(history.categoryTotal || {}) };
    // group receiptItems by category
    const itemsByCategory: Record<Category, ReceiptItem[]> =
      _receiptItems.reduce(
        (acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        },
        {} as Record<Category, ReceiptItem[]>,
      );

    (Object.keys(itemsByCategory) as Category[]).forEach((category) => {
      const categoryItems = itemsByCategory[category];
      const total = categoryItems.reduce((acc, item) => acc + item.price, 0);
      categoryTotal[category] = total;
    });

    appDispatch(
      appActions.addMonthlyHistory({
        [currentMonth]: {
          items: _receiptItems,
          id: currentMonth,
          name: currentMonth,
          price: (history.price || 0) + Number(itemTotal.toFixed(2)),
          lastMonthPrice:
            monthlyHistory[moment().subtract(1, "month").format(DATE_FORMAT)]
              ?.price || 0,
          categoryTotal,
        },
      }),
    );
    router.push("/");
  };

  const handleCategorizePress = () => {
    setError(null);
    if (receiptItems.length) {
      if (receiptCategory === Categories.Groceries) {
        loadCategoriesFromFDC(JSON.parse(JSON.stringify(receiptItems)));
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `Review items - ${receiptCategory}`,
    });
  }, [navigation]);

  useEffect(() => {
    if (!imageUri) return;
    convertImageToText(imageUri);
  }, [imageUri]);

  useEffect(() => {
    setItemTotal(0);
  }, []);

  return (
    <View style={styles.container}>
      {scanningReceipt && (
        <View style={styles.activityIndicatorContainer}>
          <AppSpinner size="large" />
        </View>
      )}
      {!scanningReceipt && (
        <View flex={1}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={
              Platform.OS == "android" ? "handled" : "always"
            }
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={true}
          >
            <View flex={1} gap={16}>
              {error && (
                <View>
                  <Notice type="error">
                    <Text>{error}</Text>
                  </Notice>
                </View>
              )}
              {!!receiptItems.length && (
                <View>
                  <Notice type="info">
                    <Text>
                      Update the item names if required to categorize them more
                      accurately.
                      {receiptCategory === Categories.Groceries && (
                        <>
                          {" "}
                          Each item is categorized through{" "}
                          <Text
                            color={"$blue10"}
                            onPress={() => Linking.openURL(DOMAINS.FDC)}
                          >
                            FDC
                          </Text>
                          .
                        </>
                      )}
                    </Text>
                  </Notice>
                </View>
              )}
              <View>
                <Form style={styles.form} gap={8} onSubmit={onSubmit}>
                  {receiptItems.map((item, index) => (
                    <ReviewRowItem
                      key={`item-${index}`}
                      index={index}
                      style={{ marginBottom: 4 }}
                      item={{
                        ...item,
                        price: `${item.price}`,
                      }}
                      iconName="close"
                      onDelete={(id) => {
                        setItemTotal(itemTotal - item.price);
                        appDispatch(receiptItemsActions.deleteItem(id));
                      }}
                      onUpdate={(item) => {
                        const _item: ReceiptItem = {
                          ...item,
                          price: Number(item.price.replace("$", "").trim()),
                        };
                        appDispatch(receiptItemsActions.updateItem(_item));
                      }}
                    />
                  ))}
                  <ReviewRowItem
                    key={`item-${receiptItems.length}`}
                    index={receiptItems.length}
                    item={newItem}
                    iconName="plus"
                    onAdd={(item) => {
                      const _item: ReceiptItem = {
                        ...item,
                        price: Number(item.price.replace("$", "").trim()),
                      };
                      appDispatch(receiptItemsActions.addItem(_item));
                      setItemTotal(itemTotal + _item.price);
                      setNewItem(emptyItem);
                    }}
                    onUpdate={(item) => setNewItem(item)}
                  />
                </Form>
              </View>
              <View marginBottom={8} style={{ lineHeight: 24 }}>
                <XStack gap={8}>
                  <XStack flex={1} alignItems="flex-end"></XStack>
                  <XStack
                    flex={8}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <YStack alignItems="flex-end" justifyContent="flex-end">
                      <Text style={styles.totalTitleText}>Item total</Text>
                      <Text fontSize={"$3"}>This amount will be saved</Text>
                    </YStack>
                  </XStack>
                  <XStack flex={3} alignItems="flex-end" marginLeft={8}>
                    <NumericFormat
                      displayType="text"
                      value={Number(itemTotal).toFixed(2)}
                      prefix={"$ "}
                      renderText={(value) => (
                        <Text style={styles.totalValueText}>{value}</Text>
                      )}
                    />
                  </XStack>
                </XStack>
              </View>
              <View marginBottom={12} style={{ lineHeight: 24 }}>
                <XStack gap={8}>
                  <XStack flex={1} alignItems="flex-end"></XStack>
                  <XStack
                    flex={8}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                  >
                    <Text style={styles.totalTitleText}>
                      Total on the receipt
                    </Text>
                  </XStack>
                  <XStack flex={3} alignItems="flex-end" marginLeft={8}>
                    <NumericFormat
                      displayType="text"
                      value={total}
                      prefix={"$ "}
                      renderText={(value) => {
                        const formattedValue = Number(
                          value.replace("$", "").trim(),
                        ).toFixed(2);
                        const isValueEqual =
                          formattedValue === itemTotal.toFixed(2);
                        return (
                          <TotalTitleText
                            color={isValueEqual ? "green" : "red"}
                          >
                            {"$ "}
                            {formattedValue}
                          </TotalTitleText>
                        );
                      }}
                    />
                  </XStack>
                </XStack>
              </View>
            </View>
          </KeyboardAwareScrollView>
          <View justifyContent="flex-end" gap={"$2"}>
            <AppButton
              circular
              size={Number(tokens.size.$true)}
              noTextWrap
              priority={"primary"}
              loading={loadingSubCategories}
              disabled={loadingSubCategories || !receiptItems.length}
              opacity={loadingSubCategories || !receiptItems.length ? 0.5 : 1}
              onPress={handleCategorizePress}
            >
              Add sub categories
            </AppButton>
            <AppButton
              circular
              size={Number(tokens.size.$true)}
              noTextWrap
              priority={"primary"}
              disabled={loadingSubCategories || !subCategories.length}
              opacity={loadingSubCategories || !subCategories.length ? 0.5 : 1}
              onPress={onSubmit}
            >
              Accept
            </AppButton>
            <AppButton
              circular
              size={Number(tokens.size.$true)}
              noTextWrap
              priority={"tertiary"}
              onPress={() => router.push("/")}
            >
              Discard
            </AppButton>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainerView: {
    flex: 1,
  },
  form: {
    flex: 1,
    width: "100%",
  },
  totalTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalValueText: {
    fontSize: 20,
  },
});
