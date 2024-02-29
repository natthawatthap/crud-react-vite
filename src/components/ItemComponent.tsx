// ItemComponent.tsx
import React from "react";
import { Item } from "../models/Item";
import DeleteItem from "./DeleteItem";

interface ItemComponentProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ item, onEdit, onDelete }) => {
  return (
    <li key={item._id}>
      <div>Name: {item.name}</div>
      <div>Description: {item.description}</div>
      <div>Price: {item.price}</div>
      <button onClick={() => onEdit(item)}>Edit</button>
      <DeleteItem itemId={item._id} onDelete={() => onDelete(item._id)} />
    </li>
  );
};

export default ItemComponent;
