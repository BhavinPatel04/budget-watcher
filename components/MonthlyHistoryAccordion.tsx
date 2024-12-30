import React from "react";
import { Accordion, ListItem, Paragraph, Square, View, YGroup } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Category, ReceiptItem } from "@/types";

export type MonthlyHistoryAccordionProps = {
  itemsByCategory: Record<Category, ReceiptItem[]>;
};

export function MonthlyHistoryAccordion({
  itemsByCategory,
}: MonthlyHistoryAccordionProps) {
  const sortedCategories = [...Object.keys(itemsByCategory)].sort();

  return (
    <Accordion overflow="hidden" type="multiple" flex={1}>
      {sortedCategories.map((category, index) => (
        <View key={`category-${index}`}>
          <Accordion.Item value={category}>
            <Accordion.Trigger
              flexDirection="row"
              borderWidth={0}
              paddingHorizontal={0}
            >
              {({ open }: { open: boolean }) => (
                <View
                  flexDirection="row"
                  justifyContent="space-between"
                  width={"100%"}
                >
                  <View flexDirection="row" gap={4}>
                    <Square animation="quick" rotate={open ? "90deg" : "0deg"}>
                      <ChevronRight size="$1" />
                    </Square>
                    <Paragraph>{category}</Paragraph>
                  </View>
                  <Paragraph>
                    $
                    {itemsByCategory[category]
                      .reduce((acc, item) => {
                        return acc + item.price;
                      }, 0)
                      .toFixed(2)}
                  </Paragraph>
                </View>
              )}
            </Accordion.Trigger>
            <Accordion.HeightAnimator animation="medium">
              <Accordion.Content
                animation="quickest"
                exitStyle={{ opacity: 0 }}
                paddingTop={0}
                paddingBottom={8}
              >
                <YGroup alignSelf="center">
                  {itemsByCategory[category].map((item, index) => (
                    <YGroup.Item key={`list-item-${index}`}>
                      <ListItem>
                        <View
                          flexDirection="row"
                          justifyContent="space-between"
                          width={"100%"}
                        >
                          <Paragraph>{item.name}</Paragraph>
                          <Paragraph>${item.price}</Paragraph>
                        </View>
                      </ListItem>
                    </YGroup.Item>
                  ))}
                </YGroup>
              </Accordion.Content>
            </Accordion.HeightAnimator>
          </Accordion.Item>
          {/* <Separator marginVertical={2} marginHorizontal={18} /> */}
        </View>
      ))}
    </Accordion>
  );
}
