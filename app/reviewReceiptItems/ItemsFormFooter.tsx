import React from "react";
import { styled, Text, View, XStack, YStack } from "tamagui";
import { NumericFormat } from "react-number-format";

const TotalTitleText = styled(Text, {
  fontSize: 20,
  fontWeight: "bold",
  color: "color",
});

export type ItemsFormFooterProps = {
  itemTotal: number;
  total: number;
};

export const ItemsFormFooter = ({ itemTotal, total }: ItemsFormFooterProps) => {
  return (
    <>
      <View marginBottom={8} style={{ lineHeight: 24 }}>
        <XStack gap={8}>
          <XStack flex={1} alignItems="flex-end"></XStack>
          <XStack flex={8} alignItems="center" justifyContent="flex-end">
            <YStack alignItems="flex-end" justifyContent="flex-end">
              <Text fontSize={20} fontWeight="bold">
                Item total
              </Text>
              <Text fontSize={"$3"}>This amount will be saved</Text>
            </YStack>
          </XStack>
          <XStack flex={3} alignItems="center" marginLeft={8}>
            <NumericFormat
              displayType="text"
              value={Number(itemTotal).toFixed(2)}
              prefix={"$ "}
              renderText={(value) => <Text fontSize={20}>{value}</Text>}
            />
          </XStack>
        </XStack>
      </View>
      <View marginBottom={12} style={{ lineHeight: 24 }}>
        <XStack gap={8}>
          <XStack flex={1} alignItems="flex-end"></XStack>
          <XStack flex={8} alignItems="flex-end" justifyContent="flex-end">
            <Text fontSize={20} fontWeight="bold">
              Total on the receipt
            </Text>
          </XStack>
          <XStack flex={3} alignItems="flex-end" marginLeft={8}>
            <NumericFormat
              displayType="text"
              value={total}
              prefix={"$ "}
              renderText={(value) => {
                const formattedValue = Number(
                  value.replace("$", "").trim(),
                ).toFixed(2);
                const isValueEqual = formattedValue === itemTotal.toFixed(2);
                return (
                  <TotalTitleText color={isValueEqual ? "green" : "red"}>
                    {"$ "}
                    {formattedValue}
                  </TotalTitleText>
                );
              }}
            />
          </XStack>
        </XStack>
      </View>
    </>
  );
};
