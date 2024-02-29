// CreateItem.tsx

import React, { useState } from "react";
import axios from "axios";
import { Item } from "../models/Item";
import "./CreateItem.css"; // Import CSS file for styling

interface CreateItemProps {
  onItemCreated: () => void;
}

const CreateItem: React.FC<CreateItemProps> = ({ onItemCreated }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const newItem: Item = {
        _id: "",
        name,
        description,
        price,
      };
      await axios.post<Item>("http://localhost:8000/v1/items/", newItem);
      onItemCreated();
      setName("");
      setDescription("");
      setPrice(0);
      alert("Item created successfully!");
    } catch (error) {
      console.error("Error creating item:", error);
      alert("An error occurred while creating the item.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form fields and cancel item creation
    setName("");
    setDescription("");
    setPrice(0);
    onItemCreated(); // Call the onItemCreated callback to indicate cancelation
  };

  return (
    <div className="create-item-container">
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
