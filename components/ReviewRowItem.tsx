import React from "react";
import { StyleSheet } from "react-native";
import { NumericFormat } from "react-number-format";
import { Input, View, XStack, YStack, Text } from "tamagui";
import { Plus, Trash2, X } from "@tamagui/lucide-icons";
import { Categories, Category, ReviewReceiptItem } from "@/types";
import { EditItemModal } from "./EditItemModal";
import { AppButton } from "./AppButton";
import AppInput from "./AppInput";
import { AppSelect } from "./AppSelect";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  receiptItemsActions,
  receiptItemsSelectors,
} from "@/store/receiptItems/slice";

export type ReviewRowItemProps = {
  key?: string;
  index?: number;
  style?: Record<string, unknown>;
  item: ReviewReceiptItem;
  iconName: "plus" | "close";
  onAdd?: (item: ReviewReceiptItem) => void;
  onDelete?: (id: string) => void;
  onUpdate: (item: ReviewReceiptItem) => void;
};

export function ReviewRowItem({
  key = "review-row-item",
  index = 0,
  style,
  item,
  iconName,
  onDelete,
  onAdd,
  onUpdate,
}: ReviewRowItemProps) {
  const appDispatch = useAppDispatch();
  const lines = useAppSelector(receiptItemsSelectors.linesSelector);
  const [categoryChangeModalVisible, setCategoryChangeModalVisible] =
    React.useState(false);

  const handleCategoryChangeModalClose = () => {
    setCategoryChangeModalVisible(false);
  };

  const onCategoryChangeClick = () => {
    setCategoryChangeModalVisible(true);
  };

  return (
    <>
      <XStack
        key={key}
        flex={1}
        justifyContent="center"
        alignItems="flex-start"
        gap={4}
        style={style}
      >
        <XStack flex={1} alignItems="center" justifyContent="center">
          {iconName === "plus" && (
            // <Plus
            //   onPress={() => {
            //     onAdd && onAdd(item);
            //   }}
            // />
            <AppButton
              circular
              onPress={() => {
                onAdd && onAdd(item);
              }}
            >
              <Plus size={"large"} />
            </AppButton>
          )}
          {iconName === "close" && (
            // <X
            //   onPress={() => {
            //     onDelete && onDelete(item.id);
            //   }}
            // />
            <AppButton
              circular
              onPress={() => {
                onDelete && onDelete(item.id);
              }}
            >
              <Trash2 size={"large"} />
            </AppButton>
          )}
        </XStack>
        <XStack flex={4} alignItems="center" justifyContent="center">
          <YStack flex={1} gap="$2">
            <YStack>
              {/* <Input
                style={{ width: "100%" }}
                placeholder="Item name"
                value={item.name}
                onChangeText={(text) => onUpdate({ ...item, name: text })}
              /> */}
              <AppSelect
                id={`change-name-select-${index}`}
                label="Item names"
                isAddNewItemAvailable={true}
                items={lines.map((c) => ({ name: c }))}
                selectedItem={item.name}
                onValueChange={(text) => {
                  onUpdate({ ...item, name: text });
                }}
                onNewItemAdded={(name) => {
                  onUpdate({ ...item, name });
                  if (!lines.includes(name)) {
                    appDispatch(receiptItemsActions.addLine(name));
                  }
                }}
              />
            </YStack>
            <YStack>
              <XStack flex={1} gap={6} alignItems="center">
                {item.subCategory && (
                  <>
                    <Text style={{ color: "#aaa" }}>{item.subCategory}</Text>
                    <AppButton
                      chromeless
                      unstyled
                      buttonSize="small"
                      onPress={onCategoryChangeClick}
                    >
                      <Text style={{ textDecorationLine: "underline" }}>
                        Edit
                      </Text>
                    </AppButton>
                  </>
                )}
                {item.id !== "newItem" && !item.subCategory && (
                  <AppButton
                    chromeless
                    unstyled
                    buttonSize="small"
                    onPress={onCategoryChangeClick}
                  >
                    <Text textDecorationLine="underline">Add sub category</Text>
                  </AppButton>
                )}
              </XStack>
            </YStack>
          </YStack>
        </XStack>
        <XStack flex={3} alignItems="center" justifyContent="center">
          <View flexGrow={1}>
            <NumericFormat
              displayType="text"
              value={item.price}
              prefix={"$ "}
              renderText={(value) => (
                <AppInput
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
          </View>
        </XStack>
      </XStack>
      {categoryChangeModalVisible && (
        <EditItemModal
          index={index}
          item={item}
          selectedSubCategory={item.subCategory}
          modalVisible={categoryChangeModalVisible}
          label={`Edit item`}
          handleClose={handleCategoryChangeModalClose}
          onItemChange={(item) => {
            onUpdate(item);
          }}
          onCategoryChange={(category) => {
            onUpdate({ ...item, category });
          }}
          onSubCategoryChange={(subCategory) => {
            onUpdate({ ...item, subCategory });
            handleCategoryChangeModalClose();
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  },
});
