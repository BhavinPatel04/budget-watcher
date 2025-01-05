import React, { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Label, View, YStack } from "tamagui";
import { useAppSelector } from "@/hooks";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch } from "@/hooks";
import {
  receiptItemsActions,
  receiptItemsSelectors,
} from "@/store/receiptItems/slice";
import { appActions, appSelectors } from "@/store/app/slice";
import { ReceiptItem, Categories } from "@/types";
import { AppSpinner } from "@/components/AppSpinner";
import AppInput from "@/components/AppInput";
import {
  getCategoryData,
  getMonthlyHistoryDataToSubmit,
  processImageUri,
} from "./util";
import { Notices } from "./Notices";
import { Actions } from "./Actions";
import { ItemsForm } from "./ItemsForm";
import { ItemsFormFooter } from "./ItemsFormFooter";
import { getRandomStoreName } from "@/utils";
import { AppSelect } from "@/components/AppSelect";

export default function ReviewReceiptItems() {
  const router = useRouter();
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const [loadingSubCategories, setLoadingSubCategories] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [storeName, setStoreName] = useState<string>("");
  const receiptCategory = useAppSelector(
    receiptItemsSelectors.receiptCategorySelector,
  );
  const localReceiptItems = useRef<ReceiptItem[]>([]);
  const hasAllItemsSubCategory = useRef<boolean>(false);

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
  // const appCategories = useAppSelector(appSelectors.subCategoriesSelector);
  const total = useAppSelector(receiptItemsSelectors.totalSelector);
  const monthlyHistory = useAppSelector(appSelectors.monthlyHistorySelector);
  const currentMonth = useAppSelector(appSelectors.selectedMonthSelector);
  const storeNames = useAppSelector(appSelectors.storeNamesSelector);

  const convertImageToText = async (imageUri: string) => {
    appDispatch(receiptItemsActions.updateScanningReceipt(true));
    appDispatch(receiptItemsActions.deleteItems());
    try {
      const { uniqueLines, itemTotal, total, parsedData, filteredItems } =
        await processImageUri(imageUri, receiptCategory, storeName);
      setItemTotal(itemTotal);
      localReceiptItems.current = filteredItems;
      appDispatch(receiptItemsActions.addLines(uniqueLines));
      appDispatch(receiptItemsActions.updateTotal(total));
      appDispatch(receiptItemsActions.addAllItems(parsedData));
      appDispatch(receiptItemsActions.addItems(filteredItems));
      appDispatch(receiptItemsActions.updateScanningReceipt(false));
    } catch (e) {
      console.error("Error while recognizing text", e);
    }
  };

  // const loadCategoriesFromModel = async (filteredItems: ReceiptItem[]) => {
  //   try {
  //     setLoadingSubCategories(true);
  //     const aiCategories = appCategories.map((category) => category.name);
  //     const defaultCategories = [
  //       "Bakery",
  //       "Baking goods",
  //       "Beverage",
  //       "Canned",
  //       "Cleaners",
  //       "Condiment",
  //       "Culinary",
  //       "Dairy",
  //       "Deli",
  //       "Electronics",
  //       "Frozen food",
  //       "Meat",
  //       "Other",
  //       "Paper goods",
  //       "Personal care",
  //       "Produce",
  //       "Snack",
  //     ];
  //     defaultCategories.forEach((category) => {
  //       if (!aiCategories.includes(category)) {
  //         aiCategories.push(category);
  //       }
  //     });
  //     const categories = await getChatResponseThroughAPI(`
  //       - Categories these items ${filteredItems.map((item) => `"${item.name}"`).join(", ")}
  //       - Use the following categories: ${aiCategories.join(", ")}
  //       - Use "Other" if you cannot figure out the category.
  //       - Return the response in a JSON format with the item name as the key and the category as the value.
  //       - Respond only with valid JSON. Do not write an introduction or summary.
  //     `);
  //     const categorizedData: Record<string, string> = JSON.parse(
  //       categories.message.content,
  //     );
  //     const _categories: SubCategoryItem[] = [];
  //     const updatedItems = filteredItems.map((item) => {
  //       const category = categorizedData[item.name];
  //       const _category = category
  //         ? category.charAt(0).toUpperCase() + category.slice(1)
  //         : "Other";
  //       item.subCategory = _category;
  //       _categories.push({ name: _category, price: item.price });
  //       return item;
  //     });
  //     appDispatch(receiptItemsActions.addSubCategories(_categories));
  //     appDispatch(receiptItemsActions.updateItems(updatedItems));
  //   } catch (e) {
  //     console.error("Error while getting chat response", e);
  //     setError(`Error while getting chat response - ${e}`);
  //   } finally {
  //     setLoadingSubCategories(false);
  //   }
  // };

  const loadCategoriesFromFDC = async (filteredItems: ReceiptItem[]) => {
    try {
      setLoadingSubCategories(true);
      const { updatedItems, subCategories: _subCategories } =
        await getCategoryData(filteredItems);
      appDispatch(
        receiptItemsActions.addSubCategories([...new Set(_subCategories)]),
      );
      appDispatch(receiptItemsActions.updateItems(updatedItems));
      hasAllItemsSubCategory.current = true;
    } catch (e) {
      console.error("Error while getting response from FDC", e);
      setError(`Error while getting response from FDC - ${e}`);
    } finally {
      setLoadingSubCategories(false);
    }
  };

  const onSubmit = () => {
    const {
      receiptItems: _receiptItems,
      categoryTotal,
      currentMonthHistory,
    } = getMonthlyHistoryDataToSubmit(
      monthlyHistory,
      currentMonth,
      receiptItems,
    );

    appDispatch(receiptItemsActions.deleteItems());
    appDispatch(receiptItemsActions.updateTotal(0));
    appDispatch(appActions.addSubCategories(subCategories));
    appDispatch(
      appActions.addMonthlyHistory({
        [currentMonth]: {
          items: _receiptItems,
          id: currentMonth,
          name: currentMonth,
          price:
            (currentMonthHistory.price || 0) + Number(itemTotal.toFixed(2)),
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
    let randomStoreName = getRandomStoreName();
    while (storeNames.includes(randomStoreName)) {
      randomStoreName = getRandomStoreName();
    }
    appDispatch(appActions.addStoreName(randomStoreName));
    setStoreName(randomStoreName);
  }, []);

  return (
    <View style={styles.container}>
      {scanningReceipt && (
        <View style={styles.activityIndicatorContainer}>
          <AppSpinner size="large" />
        </View>
      )}
      {!scanningReceipt && (
        <View flex={1} gap="$4">
          <YStack gap={4}>
            <Label lineHeight={"$true"} htmlFor="storeName">
              Store name
            </Label>
            <AppSelect
              id="storeName"
              value={storeName}
              items={storeNames.map((name) => ({ name }))}
              label="Store name"
              isAddNewItemAvailable={true}
              onNewItemAdded={(value) => {
                appDispatch(appActions.addStoreName(value));
                setStoreName(value);
              }}
            />
          </YStack>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={
              Platform.OS == "android" ? "handled" : "always"
            }
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={true}
          >
            <View flex={1} gap={16}>
              <Notices
                error={error}
                receiptItems={receiptItems}
                receiptCategory={receiptCategory}
              />
              <View>
                <ItemsForm
                  receiptItems={receiptItems}
                  receiptCategory={receiptCategory}
                  storeName={storeName}
                  onItemAdd={(item) => {
                    const _item: ReceiptItem = {
                      ...item,
                      price: Number(item.price.replace("$", "").trim()),
                    };
                    appDispatch(receiptItemsActions.addItem(_item));
                    setItemTotal(itemTotal + _item.price);
                  }}
                  onItemDelete={(id, item) => {
                    setItemTotal(itemTotal - item.price);
                    appDispatch(receiptItemsActions.deleteItem(id));
                  }}
                  onItemUpdate={(item) => {
                    const _item: ReceiptItem = {
                      ...item,
                      price: Number(item.price.replace("$", "").trim()),
                    };
                    appDispatch(receiptItemsActions.updateItem(_item));
                  }}
                />
              </View>
              <ItemsFormFooter itemTotal={itemTotal} total={total} />
            </View>
          </KeyboardAwareScrollView>
          <View justifyContent="flex-end" gap={"$2"}>
            <Actions
              loadingSubCategories={loadingSubCategories}
              hasAllItemsSubCategory={hasAllItemsSubCategory}
              receiptItems={receiptItems}
              onCategorizePress={handleCategorizePress}
              onSubmit={onSubmit}
            />
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
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
