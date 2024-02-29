import React from "react";
import { Item } from "../models/Item";

interface ItemComponentProps {
  item: Item;
  onEdit: (item: Item) => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ item, onEdit }) => {
  return (
    <li key={item._id}>
      <div className="card">
        <div>Name: {item.name}</div>
        <div>Description: {item.description}</div>
        <div>Price: {item.price}</div>
        <button onClick={() => onEdit(item)}>Edit</button>
      </div>
    </li>
  );
};

export default ItemComponent;
