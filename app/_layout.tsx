import { useEffect } from "react";
import {
  StyleSheet
} from "react-native";
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from '@ant-design/react-native';

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
  })
  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  };

  return <Provider>
    <Stack 
      screenOptions={{
        headerShown: false,
        contentStyle: {
          ...styles.container
        },
      }}
    />
  </Provider>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});