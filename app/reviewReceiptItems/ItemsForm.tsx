import React, { useState } from "react";
import { Form } from "tamagui";
import { ReceiptItem, ReviewReceiptItem } from "@/types";
import { ReviewRowItem } from "@/components/ReviewRowItem";

export type ItemsFormProps = {
  receiptItems: ReceiptItem[];
  receiptCategory: string;
  storeName: string;
  onItemAdd: (item: ReviewReceiptItem) => void;
  onItemUpdate: (item: ReviewReceiptItem) => void;
  onItemDelete: (id: string, item: ReceiptItem) => void;
};

export const ItemsForm = ({
  receiptItems,
  receiptCategory,
  storeName,
  onItemAdd,
  onItemUpdate,
  onItemDelete,
}: ItemsFormProps) => {
  const emptyItem: ReviewReceiptItem = {
    id: "newItem",
    name: "",
    price: "",
    category: receiptCategory,
    subCategory: "",
    storeName,
  };
  const [newItem, setNewItem] = useState<ReviewReceiptItem>(emptyItem);

  return (
    <Form flex={1} width={"100%"} gap={8}>
      {receiptItems.map((item, index) => (
        <ReviewRowItem
          key={`item-${index}`}
          dataKey={`item-${index}`}
          index={index}
          style={{ marginBottom: 4 }}
          item={{
            ...item,
            price: `${item.price}`,
          }}
          iconName="close"
          onDelete={(id) => onItemDelete(id, item)}
          onUpdate={onItemUpdate}
        />
      ))}
      <ReviewRowItem
        dataKey={`item-${receiptItems.length}`}
        index={receiptItems.length}
        item={newItem}
        iconName="plus"
        onAdd={(item) => {
          onItemAdd(item);
          setNewItem(emptyItem);
        }}
        onUpdate={(item) => setNewItem(item)}
      />
    </Form>
  );
};
