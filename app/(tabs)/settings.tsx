import { tokens } from "@tamagui/config/v3";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Sheet, Text, View } from "tamagui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { appSelectors, appActions } from "@/store/app/slice";
import { receiptItemsActions } from "@/store/receiptItems/slice";

export default function Settings() {
  const appDispatch = useAppDispatch();
  const selectedMonth = useAppSelector(appSelectors.selectedMonthSelector);

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        circular
        size={Number(tokens.size.$true)}
        noTextWrap
        themeInverse
        onPress={() => {
          appDispatch(appActions.reset());
          appDispatch(receiptItemsActions.reset());
        }}
      >
        <Text style={{ fontSize: 16 }}>Reset all data</Text>
      </Button>
      <Button
        style={styles.button}
        circular
        size={Number(tokens.size.$true)}
        noTextWrap
        themeInverse
        onPress={() => {
          appDispatch(appActions.deleteMonthlyHistoryItem(selectedMonth));
        }}
      >
        <Text style={{ fontSize: 16 }}>Reset data for selected month</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    gap: 8,
  },
  button: {
    padding: 8,
    width: "100%",
  },
});
