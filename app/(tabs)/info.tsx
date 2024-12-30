import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "tamagui";

export default function Info() {
  return (
    <View flex={1} style={styles.container}>
      <Text>Built by Bhavin Patel</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
});
