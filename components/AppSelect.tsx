import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Plus } from "@tamagui/lucide-icons";
import type { FontSizeTokens, SelectProps } from "tamagui";
import {
  Adapt,
  Input,
  Select,
  Sheet,
  Text,
  View,
  XStack,
  YStack,
  getFontSize,
  getTokens,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { AppButton } from "./AppButton";
import { AppSelectItem } from "@/types";
import AppInput from "./AppInput";

const appTokens = getTokens();

export type AppSelectProps = SelectProps & {
  label: string;
  selectedItem?: string;
  items: AppSelectItem[];
  isAddNewItemAvailable?: boolean;
  onValueChange?: (value: string) => void;
  onNewItemAdded?: (item: string) => void;
};

export function AppSelect({
  label,
  selectedItem = "",
  items,
  isAddNewItemAvailable,
  onNewItemAdded,
  onValueChange,
  ...props
}: AppSelectProps) {
  const inputRef = useRef<Input>(null);
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!newItem) {
      setError("");
    }
  }, [newItem]);

  return (
    <Select
      value={selectedItem}
      disablePreventBodyScroll
      open={openModal}
      onValueChange={(value) => {
        onValueChange && onValueChange(value);
        setOpenModal(false);
      }}
      {...props}
    >
      <Select.Trigger
        iconAfter={ChevronDown}
        backgroundColor={"#fff"}
        borderRadius={24}
        paddingVertical={0}
        borderColor={appTokens.color.primary}
        onPress={() => setOpenModal(true)}
        onPressIn={() => setOpenModal(true)} // onPress doesn't work on
      >
        <Select.Value placeholder="Select value" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom={false}
          dismissOnOverlayPress={false}
          disableDrag={true}
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            onPress={() => setOpenModal(false)}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          minWidth={200}
          animation="medium"
          animateOnly={["transform", "opacity"]}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
        >
          <Select.Group>
            <Select.Label>{label}</Select.Label>
            {isAddNewItemAvailable && (
              <>
                <Select.Item index={0} key={"newItem"} value={newItem}>
                  <XStack gap={4}>
                    <AppInput
                      ref={inputRef}
                      flex={2}
                      onChangeText={setNewItem}
                    />
                    <View flex={1}>
                      <AppButton
                        circular
                        disabled={!newItem}
                        opacity={newItem ? 1 : 0.5}
                        onPress={() => {
                          if (!items.find((item) => item.name === newItem)) {
                            onNewItemAdded && onNewItemAdded(newItem);
                            setOpenModal(false);
                            setNewItem("");
                            inputRef.current?.clear();
                          } else {
                            setError("Item already exists");
                          }
                        }}
                      >
                        <XStack gap={2} alignItems="center">
                          <Plus size={16} />
                          <Text>Add</Text>
                        </XStack>
                      </AppButton>
                    </View>
                  </XStack>
                </Select.Item>
                {newItem && error && (
                  <Text paddingHorizontal={24} color={"$red10Light"}>
                    {error}
                  </Text>
                )}
              </>
            )}
            {/* for longer lists memoizing these is useful */}
            {React.useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i + 1}
                      key={`${item.name}-${i}`}
                      value={item.name}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items],
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["transparent", "$background"]}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
