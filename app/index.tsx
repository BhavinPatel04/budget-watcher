import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  // Button,
  // View,
  StyleSheet,
  Text
} from "react-native";
import {
  launchCameraAsync,
  launchImageLibraryAsync
} from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { parseTextFromImage } from "@/utils/textRecognition";
import {
  Button,
  Flex,
  Modal,
  View,
  WhiteSpace,
  WingBlank
} from '@ant-design/react-native'
import AppButton from "@/components/AppButton";

export default function Index() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [text, setText] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showScanOptions, setShowScanOptions] = useState<boolean>(false);

  const launchPhoneCamera = async () => {
    const result = await launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      // setImageBase64(result.assets[0].base64 || '');
      setImageUri(result.assets[0].uri);
    }
  };

  const launchPhoneGallery = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      // setImageBase64(result.assets[0].base64 || '');
      setImageUri(result.assets[0].uri || '');
    }
  };

  const convertImageToText = async (imageUri: string) => {
    setLoading(true);
    try {
      const result = await TextRecognition.recognize(imageUri);
      const parsedData = parseTextFromImage(result);
      setText(parsedData);
      setLoading(false);
    } catch(e) {
      console.error('Error while getting chat response', e);
    }
  }
  useEffect(() => {
    if(!imageUri) return;
    convertImageToText(imageUri);
  }, [imageUri]);

  return (
    <SafeAreaView style={{ height: '100%'}}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Budget Watcher</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text>Show all till now data</Text>
        </View>
        <View style={styles.scanButtonContainer}>
          <AppButton
            type='primary'
            onPress={() => setShowScanOptions(true)}
          >
              Scan
          </AppButton>
        </View>
      </View>
      <Modal
        popup
        modalType={"portal"}
        visible={showScanOptions}
        animationType="slide-up"
        onClose={() => setShowScanOptions(false)}>
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <AppButton type='primary' onPress={launchPhoneCamera}>
            Take a picture
          </AppButton>
          <WhiteSpace />
          <AppButton type='primary' onPress={launchPhoneGallery}>
            Use from gallery
          </AppButton>
          <WhiteSpace size="lg"/>
          <AppButton type="ghost" onPress={() => setShowScanOptions(false)}>
            Close
          </AppButton>
        </View>
      </Modal>
      {loading && <Text>Loading...</Text>}
      {text && <Text>{JSON.stringify(text) || 'No message'}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 36,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flexGrow: 1,
    gap: 24
  },
  scanButtonContainer: {
    height: 'auto',
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column'
  }
});