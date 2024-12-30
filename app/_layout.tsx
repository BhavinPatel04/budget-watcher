import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Provider as ReduxProvider } from "react-redux";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { TamaguiProvider } from "tamagui";
import { store } from "@/store";
import config from "@/tamagui.config";

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <TamaguiProvider config={config}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              ...styles.container,
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              contentStyle: {
                ...styles.tabContainer,
              },
            }}
          />
        </Stack>
      </TamaguiProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  tabContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
