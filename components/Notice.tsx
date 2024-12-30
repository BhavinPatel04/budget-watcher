import React from "react";
import { OpaqueColorValue } from "react-native";
import { GetThemeValueForKey, styled, View } from "tamagui";

export type NoticeProps = {
  type?: "default" | "info" | "warning" | "error";
  children: React.ReactNode;
};

const StyledView = styled(View, {
  borderRadius: 8,
  width: "100%",
  padding: 16,
  backgroundColor: "color",
});

export function Notice({ type = "default", ...props }: NoticeProps) {
  let backgroundColor:
    | "unset"
    | GetThemeValueForKey<"backgroundColor">
    | OpaqueColorValue
    | undefined = "$gray5";
  switch (type) {
    case "info":
      backgroundColor = "$blue5";
      break;
    case "warning":
      backgroundColor = "$yellow5";
      break;
    case "error":
      backgroundColor = "$red5";
      break;
  }
  return (
    <StyledView backgroundColor={backgroundColor}>{props.children}</StyledView>
  );
}
