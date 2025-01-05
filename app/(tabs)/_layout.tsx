import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { getTokens } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";
import config from "@/tamagui.config";
import { StyleSheet } from "react-native";

const appTokens = getTokens();

export default function TabLayout() {
  return (
    <TamaguiProvider config={config}>
      <SafeAreaView style={{ height: "100%" }}>
        <Theme name="light">
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: appTokens.color.primary.toString(),
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color }) => (
                  <FontAwesome size={28} name="home" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: "Settings",
                tabBarIcon: ({ color }) => (
                  <FontAwesome size={28} name="cog" color={color} />
                ),
              }}
            />
            {/* <Tabs.Screen
              name="info"
              options={{
                title: "Info",
                tabBarIcon: ({ color }) => (
                  <FontAwesome size={28} name="info-circle" color={color} />
                ),
              }}
            /> */}
          </Tabs>
        </Theme>
      </SafeAreaView>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
