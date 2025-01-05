import { tokens } from "@tamagui/config/v3";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, H4, Label, Separator, Sheet, Text, View } from "tamagui";
import { Category, Categories } from "@/types";
import { CategorySelection } from "./CategorySelection";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  receiptItemsSelectors,
  receiptItemsActions,
} from "@/store/receiptItems/slice";
import AppButton from "./AppButton";

export type AddItemsModalProps = {
  modalVisible: boolean;
  handleClose: () => void;
  onLaunchPhoneCamera: () => void;
  onLaunchPhoneGallery: () => void;
  onAddItemsManually: () => void;
};

export function AddItemsModal({
  modalVisible,
  handleClose,
  onLaunchPhoneCamera,
  onLaunchPhoneGallery,
  onAddItemsManually,
}: AddItemsModalProps) {
  const appDispatch = useAppDispatch();
  const receiptCategory = useAppSelector(
    receiptItemsSelectors.receiptCategorySelector,
  );

  return (
    <Sheet
      modal={false}
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
      <Sheet.Frame paddingVertical="$4" paddingHorizontal="$3" gap="$2">
        <View justifyContent="flex-end" alignItems="center">
          <H4>Add items</H4>
        </View>
        <View flex={1}>
          <Label size={"$5"} lineHeight={"24"}>
            Select category
          </Label>
          <Separator alignSelf="baseline" marginVertical={5} />
          <CategorySelection
            id="category-selection"
            defaultCategory={receiptCategory}
            onCategorySelect={(category: Category) => {
              appDispatch(receiptItemsActions.updateReceiptCategory(category));
            }}
          />
        </View>
        <Separator alignSelf="baseline" marginVertical={2} />
        <AppButton
          style={styles.button}
          circular
          size={Number(tokens.size.$true)}
          noTextWrap
          themeInverse
          disabled={!receiptCategory}
          opacity={receiptCategory ? 1 : 0.5}
          priority="primary"
          onPress={onLaunchPhoneCamera}
        >
          Take a picture
        </AppButton>
        <AppButton
          style={styles.button}
          circular
          size={Number(tokens.size.$true)}
          noTextWrap
          themeInverse
          disabled={!receiptCategory}
          opacity={receiptCategory ? 1 : 0.5}
          priority="primary"
          onPress={onLaunchPhoneGallery}
        >
          Use picture from gallery
        </AppButton>
        <AppButton
          style={styles.button}
          circular
          size={Number(tokens.size.$true)}
          theme={"active"}
          disabled={!receiptCategory}
          opacity={receiptCategory ? 1 : 0.5}
          priority="secondary"
          onPress={onAddItemsManually}
        >
          Add manually
        </AppButton>
        <AppButton
          style={styles.button}
          circular
          size={Number(tokens.size.$true)}
          priority="tertiary"
          onPress={handleClose}
        >
          Close
        </AppButton>
      </Sheet.Frame>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  },
  button: {
    width: "100%",
  },
});
