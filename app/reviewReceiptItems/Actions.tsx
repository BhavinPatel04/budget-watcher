import React from "react";
import { useRouter } from "expo-router";
import { ReceiptItem } from "@/types";
import { tokens } from "@tamagui/config/v3";
import AppButton from "@/components/AppButton";
import { AppAlertDialog } from "@/components/AppAlertDialog";

export type ActionsProps = {
  loadingSubCategories: boolean;
  receiptItems: ReceiptItem[];
  hasAllItemsSubCategory: React.MutableRefObject<boolean>;
  onCategorizePress: () => void;
  onSubmit: () => void;
};

export const Actions = ({
  loadingSubCategories,
  receiptItems,
  hasAllItemsSubCategory,
  onCategorizePress,
  onSubmit,
}: ActionsProps) => {
  const router = useRouter();
  return (
    <>
      <AppButton
        circular
        size={Number(tokens.size.$true)}
        noTextWrap
        priority={"primary"}
        loading={loadingSubCategories}
        disabled={loadingSubCategories || !receiptItems.length}
        opacity={loadingSubCategories || !receiptItems.length ? 0.5 : 1}
        onPress={onCategorizePress}
      >
        Add sub categories
      </AppButton>
      {!hasAllItemsSubCategory.current && (
        <AppAlertDialog
          alertTitle="Confirm"
          alertButtonText="Accept"
          alertMessage="Without adding sub categories, the items will be categorized by their names. Are you sure you want to continue?"
          onAccept={onSubmit}
          onCancel={() => {}}
        />
      )}
      {hasAllItemsSubCategory.current && (
        <AppButton
          circular
          size={Number(tokens.size.$true)}
          noTextWrap
          priority={"primary"}
          onPress={onSubmit}
        >
          Accept
        </AppButton>
      )}
      <AppButton
        circular
        size={Number(tokens.size.$true)}
        noTextWrap
        priority={"tertiary"}
        onPress={() => router.push("/")}
      >
        Discard
      </AppButton>
    </>
  );
};
