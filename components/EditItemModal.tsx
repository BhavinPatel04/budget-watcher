import { tokens } from "@tamagui/config/v3";
import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  H4,
  H6,
  Input,
  Label,
  Separator,
  Sheet,
  Text,
  View,
  YStack,
} from "tamagui";
import { AppSelect } from "./AppSelect";
import { appSelectors } from "@/store/app/slice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  receiptItemsSelectors,
  receiptItemsActions,
} from "@/store/receiptItems/slice";
import { SubCategoryItem, Category, ReviewReceiptItem } from "@/types";
import { getFoodCategory } from "@/utils/fdc";
import { CategorySelection } from "./CategorySelection";
import { AppButton } from "./AppButton";

export type EditItemModalProps = {
  selectedSubCategory?: string;
  index?: number;
  item: ReviewReceiptItem;
  modalVisible: boolean;
  label?: string;
  handleClose: () => void;
  onItemChange: (item: ReviewReceiptItem) => void;
  onCategoryChange: (category: Category) => void;
  onSubCategoryChange: (subCategory: string) => void;
};

export function EditItemModal({
  selectedSubCategory,
  index = 0,
  item,
  modalVisible,
  label,
  handleClose,
  onItemChange,
  onCategoryChange,
  onSubCategoryChange,
}: EditItemModalProps) {
  const appDispatch = useAppDispatch();
  const receiptCategory = useAppSelector(
    receiptItemsSelectors.receiptCategorySelector,
  );
  const receiptCategories = useAppSelector(
    receiptItemsSelectors.subCategoriesSelector,
  );
  const categories = useAppSelector(appSelectors.subCategoriesSelector);
  const items: SubCategoryItem[] = [...categories];
  receiptCategories.forEach((category) => {
    if (!items.find((item) => item.name === category.name)) {
      items.push({
        name: category.name,
      });
    }
  });

  const getCategoryForItem = async (item: ReviewReceiptItem) => {
    try {
      const subCategory = await getFoodCategory(item.name);
      if (subCategory) {
        const subCategoryValue = subCategory[item.name];
        onSubCategoryChange(subCategoryValue);
        if (!receiptCategories.find((item) => item.name === subCategoryValue)) {
          appDispatch(
            receiptItemsActions.addSubCategory({
              name: subCategoryValue,
            }),
          );
        }
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <Sheet
      modal={true}
      open={modalVisible}
      animation="medium"
      snapPointsMode="fit"
      onOpenChange={(open: boolean) => {
        if (!open) handleClose();
      }}
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle onPress={handleClose} />
      <Sheet.Frame
        paddingVertical="$4"
        paddingHorizontal="$3"
        flex={1}
        gap={"$2"}
      >
        {label && <H4 textAlign="center">{label}</H4>}
        <Label size={"$5"} lineHeight={32}>
          Item name
        </Label>
        <Input
          style={{ width: "100%" }}
          placeholder="Item"
          value={item.name}
          onChangeText={(text) => onItemChange({ ...item, name: text })}
        />
        <Label size={"$5"} lineHeight={32}>
          Change category
        </Label>
        <CategorySelection
          id="category-selection"
          defaultCategory={receiptCategory}
          onCategorySelect={(category: Category) => {
            onCategoryChange(category);
          }}
        />
        <Label size={"$5"} lineHeight={32}>
          Change sub category
        </Label>
        <YStack gap={"$2"}>
          <AppButton
            flex={1}
            width={"100%"}
            padding={8}
            circular
            size={Number(tokens.size.$true)}
            priority={"secondary"}
            onPress={() => {
              getCategoryForItem(item);
            }}
          >
            Refetch
          </AppButton>
          <AppSelect
            id={`change-category-select-${index}`}
            label="Sub categories"
            isAddNewItemAvailable={true}
            items={items}
            selectedItem={selectedSubCategory}
            onValueChange={onSubCategoryChange}
            onNewItemAdded={(category) => {
              appDispatch(
                receiptItemsActions.addSubCategory({
                  name: category,
                }),
              );
              onSubCategoryChange(category);
            }}
          />
          <AppButton
            style={styles.button}
            circular
            size={Number(tokens.size.$true)}
            noTextWrap
            priority="tertiary"
            onPress={handleClose}
          >
            Close
          </AppButton>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  },
  button: {
    padding: 8,
    width: "100%",
  },
});
