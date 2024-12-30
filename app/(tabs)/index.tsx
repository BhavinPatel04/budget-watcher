import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {
  ImagePickerSuccessResult,
  launchCameraAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";
import { View, Text, getTokens, XStack, Separator } from "tamagui";
import moment from "moment";
import { AddItemsModal } from "@/components/AddItemsModal";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { receiptItemsActions } from "@/store/receiptItems/slice";
import { MonthlyHistory } from "@/components/MonthlyHistory";
import { tokens } from "@tamagui/config/v3";
import { AppSelect } from "@/components/AppSelect";
import { AppSelectItem } from "@/types";
import { DATE_FORMAT } from "@/constants/app";
import { appActions, appSelectors } from "@/store/app/slice";
import monthlyHistoryMock from "@/__mocks__/monthlyHistory.json";
import { AppButton } from "@/components/AppButton";

const appTokens = getTokens();

export default function Index() {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const [showAddItemsModal, setShowAddItemsModal] = useState<boolean>(false);
  const [isAddingItemsLoading, setIsAddingItemsLoading] =
    useState<boolean>(false);
  const [months, setMonths] = useState<AppSelectItem[]>([]);
  const selectedMonth = useAppSelector(appSelectors.selectedMonthSelector);

  const launchPhoneCamera = async () => {
    setIsAddingItemsLoading(true);
    setShowAddItemsModal(false);
    const result = await launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      handleImageUploadSuceess(result);
    } else {
      setIsAddingItemsLoading(false);
    }
  };

  const launchPhoneGallery = async () => {
    setIsAddingItemsLoading(true);
    setShowAddItemsModal(false);
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      handleImageUploadSuceess(result);
    } else {
      setIsAddingItemsLoading(false);
    }
  };

  const handleImageUploadSuceess = (result: ImagePickerSuccessResult) => {
    const uri = result.assets[0].uri;
    // setImageBase64(result.assets[0].base64 || '');
    router.navigate("/reviewReceiptItems");
    appDispatch(receiptItemsActions.updateImageUri(uri));
    setIsAddingItemsLoading(false);
  };

  useEffect(() => {
    // reset on load
    appDispatch(receiptItemsActions.reset());

    // reset app state
    // appDispatch(appActions.reset());

    const _months: AppSelectItem[] = [];
    for (let i = 0; i <= 6; i++) {
      _months.push({
        name: moment().subtract(i, "months").format(DATE_FORMAT),
      });
    }
    setMonths(_months);
    // appDispatch(addMonthlyHistory(monthlyHistoryMock));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View flex={1}>
          <View flex={1}>
            <AppSelect
              label="Select Month"
              items={months}
              selectedItem={selectedMonth}
              onValueChange={(month) => {
                appDispatch(appActions.updateSelectedMonth(month));
              }}
            />
          </View>
          <Separator alignSelf="baseline" marginBottom={4} />
          <View flex={10}>
            <MonthlyHistory />
          </View>
          <View flex={1} style={styles.scanButtonContainer} gap={8}>
            <AppButton
              style={{ padding: 8 }}
              circular
              size={Number(tokens.size.$true)}
              noTextWrap
              priority={"primary"}
              loading={isAddingItemsLoading}
              onPress={() => setShowAddItemsModal(true)}
            >
              Add items
            </AppButton>
          </View>
        </View>
      </View>
      <AddItemsModal
        modalVisible={showAddItemsModal}
        handleClose={() => setShowAddItemsModal(false)}
        onLaunchPhoneCamera={launchPhoneCamera}
        onLaunchPhoneGallery={launchPhoneGallery}
        onAddItemsManually={() => {
          router.navigate("/reviewReceiptItems");
          setShowAddItemsModal(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 36,
  },
  scanButtonContainer: {
    height: "auto",
    justifyContent: "flex-end",
    flexDirection: "column",
    width: "100%",
  },
});
