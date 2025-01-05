import { tokens } from "@tamagui/config/v3";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, ListItem, Sheet, Text, View, YGroup } from "tamagui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { appSelectors, appActions } from "@/store/app/slice";
import { receiptItemsActions } from "@/store/receiptItems/slice";
import AppButton from "@/components/AppButton";

export default function Settings() {
  const appDispatch = useAppDispatch();
  const selectedMonth = useAppSelector(appSelectors.selectedMonthSelector);

  return (
    <View flex={1} style={styles.container}>
      <YGroup flex={1} alignSelf="center" backgroundColor={"#fff"}>
        <YGroup.Item>
          <ListItem
            hoverTheme
            backgroundColor={"#fff"}
            title={
              <AppButton
                unstyled
                onPress={() => {
                  appDispatch(appActions.reset());
                  appDispatch(receiptItemsActions.reset());
                }}
              >
                <Text style={{ fontSize: 16 }}>Reset all data</Text>
              </AppButton>
            }
          />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem
            hoverTheme
            backgroundColor={"#fff"}
            title={
              <AppButton
                unstyled
                onPress={() => {
                  appDispatch(
                    appActions.deleteMonthlyHistoryItem(selectedMonth),
                  );
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  Reset data for selected month
                </Text>
              </AppButton>
            }
          />
        </YGroup.Item>
      </YGroup>
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
