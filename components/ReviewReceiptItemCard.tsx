import React from "react";
import { NumericFormat } from "react-number-format";
import { View, XStack, Text, CardProps, Card, getTokens } from "tamagui";
import { Plus, Trash2, RefreshCw } from "@tamagui/lucide-icons";
import { Category, ReviewReceiptItem, SubCategoryItem } from "@/types";
import AppButton from "./AppButton";
import { AppSelect } from "./AppSelect";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { appSelectors } from "@/store/app/slice";
import AppInput from "./AppInput";
import {
  receiptItemsActions,
  receiptItemsSelectors,
} from "@/store/receiptItems/slice";
import { getFoodCategory } from "@/utils/fdc";

const appTokens = getTokens();

export type ReviewReceiptItemCardProps = CardProps & {
  index?: number;
  style?: Record<string, unknown>;
  item: ReviewReceiptItem;
  iconName: "plus" | "close";
  category: Category;
  onAdd?: (item: ReviewReceiptItem) => void;
  onDelete?: (id: string) => void;
  onUpdate: (item: ReviewReceiptItem) => void;
};

export function ReviewReceiptItemCard({
  index = 0,
  style,
  item,
  iconName,
  category,
  onDelete,
  onAdd,
  onUpdate,
  ...props
}: ReviewReceiptItemCardProps) {
  const appDispatch = useAppDispatch();
  const lines = useAppSelector(receiptItemsSelectors.linesSelector);
  const categories = useAppSelector(appSelectors.categoriesSelector);
  const subCategories = useAppSelector(appSelectors.subCategoriesSelector);
  const receiptSubCategories = useAppSelector(
    receiptItemsSelectors.subCategoriesSelector,
  );
  const allSubCategories: SubCategoryItem[] = [...subCategories];
  receiptSubCategories.forEach((category) => {
    if (!allSubCategories.find((item) => item.name === category.name)) {
      allSubCategories.push({
        name: category.name,
      });
    }
  });

  const getCategoryForItem = async (item: ReviewReceiptItem) => {
    try {
      const subCategory = await getFoodCategory(item.name);
      if (subCategory) {
        const subCategoryValue = subCategory[item.name];
        if (
          !receiptSubCategories.find((item) => item.name === subCategoryValue)
        ) {
          appDispatch(
            receiptItemsActions.addSubCategory({
              name: subCategoryValue,
            }),
          );
        }
        onUpdate({
          ...item,
          subCategory: subCategoryValue,
        });
      }
    } catch (error) {
      console.error("Error getting sub category for item", error);
    } finally {
    }
  };

  return (
    <Card
      size="$2"
      bordered
      padding={10}
      borderRadius={16}
      backgroundColor={"#fff"}
      borderColor={appTokens.color.primary}
      {...props}
    >
      <Card.Header gap={8}>
        <XStack flex={1} gap={8} alignItems="center">
          <Text>Name</Text>
          <View flexGrow={1}>
            <AppSelect
              id={`change-name-select-${index}`}
              label="Names"
              isAddNewItemAvailable={true}
              items={lines.map((c) => ({ name: c }))}
              selectedItem={item.name}
              onValueChange={(text) => {
                onUpdate({ ...item, name: text });
              }}
              onNewItemAdded={(name) => {
                onUpdate({ ...item, name });
              }}
            />
          </View>
        </XStack>
        <XStack flex={1} gap={8} alignItems="center">
          <Text>Price</Text>
          <NumericFormat
            displayType="text"
            value={item.price}
            prefix={"$ "}
            renderText={(value) => (
              <AppInput
                flexGrow={1}
                value={value}
                placeholder="$ 0.00"
                onChangeText={(text) => {
                  onUpdate({
                    ...item,
                    price: text,
                  });
                }}
              />
            )}
          />
        </XStack>
        <XStack flex={1} gap={8} alignItems="center">
          <Text>Category</Text>
          <View flexGrow={1}>
            <AppSelect
              id={`change-category-select-${index}`}
              label="Categories"
              isAddNewItemAvailable={false}
              items={categories.map((c) => ({ name: c }))}
              selectedItem={item.category}
              onValueChange={(value) => {
                onUpdate({
                  ...item,
                  category: value,
                });
              }}
            />
          </View>
        </XStack>
        <XStack flex={1} gap={8} alignItems="center">
          <Text>Sub category</Text>
          <View flexGrow={1}>
            <AppSelect
              id={`change-sub-category-select-${index}`}
              label="Sub categories"
              isAddNewItemAvailable={true}
              items={allSubCategories}
              selectedItem={item.subCategory}
              onValueChange={(value) => {
                appDispatch(
                  receiptItemsActions.addSubCategory({
                    name: value,
                  }),
                );
                onUpdate({
                  ...item,
                  subCategory: value,
                });
              }}
              onNewItemAdded={(value) => {
                onUpdate({ ...item, subCategory: value });
              }}
            />
          </View>
          {item.id !== "newItem" && (
            <AppButton
              circular
              onPress={() => {
                getCategoryForItem(item);
              }}
            >
              <RefreshCw size={"large"} />
            </AppButton>
          )}
        </XStack>
      </Card.Header>
      <Card.Footer marginTop={8} marginRight={6}>
        <XStack flex={1} />
        <XStack
          flex={1}
          alignItems="flex-end"
          justifyContent="flex-end"
          gap={8}
        >
          {item.id !== "newItem" && (
            <AppButton
              circular
              onPress={() => {
                onDelete && onDelete(item.id);
              }}
            >
              <Trash2 size={"large"} />
            </AppButton>
          )}
          {item.id === "newItem" && (
            <AppButton
              circular
              onPress={() => {
                onAdd && onAdd(item);
              }}
            >
              <Plus size={"large"} />
            </AppButton>
          )}
        </XStack>
      </Card.Footer>
      <Card.Background></Card.Background>
    </Card>
  );
}
