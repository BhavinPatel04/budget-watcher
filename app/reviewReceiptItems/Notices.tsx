import React from "react";
import { Linking } from "react-native";
import { View, Text } from "tamagui";
import { Categories, ReceiptItem } from "@/types";
import { Notice } from "@/components/Notice";
import { DOMAINS } from "@/constants/endpoint";

export type NoticesProps = {
  error: string | null;
  receiptItems: ReceiptItem[];
  receiptCategory: string;
};

export const Notices = ({
  error,
  receiptItems,
  receiptCategory,
}: NoticesProps) => {
  return (
    <>
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
    </>
  );
};
