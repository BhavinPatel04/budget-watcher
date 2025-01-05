import React from "react";
import { StyleSheet } from "react-native";
import { Card, H2, H4, Text, View } from "tamagui";

export default function Info() {
  return (
    <View flex={1} style={styles.container}>
      <Card elevate size="$4" bordered>
        <Card.Header padded>
          <H4>Developed by Bhavin Patel</H4>
        </Card.Header>
      </Card>
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
