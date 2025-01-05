import React from "react";
import { AlertDialog, AlertDialogProps, XStack, YStack } from "tamagui";
import AppButton from "./AppButton";

export type AppAlertDialogProps = AlertDialogProps & {
  alertTitle: string;
  alertButtonText: string;
  alertMessage: string;
  onCancel?: () => void;
  onAccept?: () => void;
};

export function AppAlertDialog({
  alertTitle,
  alertButtonText,
  alertMessage,
  onCancel,
  onAccept,
}: AppAlertDialogProps) {
  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <AppButton circular noTextWrap priority={"primary"}>
          {alertButtonText}
        </AppButton>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap={4}>
            <AlertDialog.Title>{alertTitle}</AlertDialog.Title>
            <AlertDialog.Description>{alertMessage}</AlertDialog.Description>
            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel
                asChild
                onPress={() => {
                  onCancel && onCancel();
                }}
              >
                <AppButton>Cancel</AppButton>
              </AlertDialog.Cancel>
              <AlertDialog.Action
                asChild
                onPress={() => {
                  onAccept && onAccept();
                }}
              >
                <AppButton priority="primary">Accept</AppButton>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
