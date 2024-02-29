// ItemComponent.tsx
import React from "react";
import { Item } from "../models/Item";
import DeleteItem from "./DeleteItem";
import "./ItemComponent.css"; // Import CSS file for styling

interface ItemComponentProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div key={item._id} className="card">
      <div className="card-content">
        <div className="card-field">
          <span className="label">Name:</span>
          <span>{item.name}</span>
        </div>
        <div className="card-field">
          <span className="label">Description:</span>
          <span>{item.description}</span>
        </div>
        <div className="card-field">
          <span className="label">Price:</span>
          <span>{item.price}</span>
        </div>
        <div className="card-buttons">
          <button onClick={() => onEdit(item)}>Edit</button>
          <DeleteItem itemId={item._id} onDelete={() => onDelete(item._id)} />
        </div>
      </div>
    </div>
  );
};

export default ItemComponent;
