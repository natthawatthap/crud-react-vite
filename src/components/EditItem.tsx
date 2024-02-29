import React, { useState } from "react";
import axios from "axios";
import { Item } from "../models/Item";

interface EditItemProps {
  item: Item; // Item to be edited
  onUpdate: () => void; // Function to call after item is updated
  onCancel: () => void; // Function to call when editing is canceled
}

const EditItem: React.FC<EditItemProps> = ({ item, onUpdate, onCancel }) => {
  const [name, setName] = useState<string>(item.name);
  const [description, setDescription] = useState<string>(item.description);
  const [price, setPrice] = useState<number>(item.price);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const updatedItem: Item = {
        ...item,
        name,
        description,
        price,
      };
      await axios.put<Item>(
        `http://localhost:8000/v1/items/${item._id}`,
        updatedItem
      );
      onUpdate(); // Call the function to refetch items
      alert("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
      setError("An error occurred while updating the item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit Item</h2>
      {error && <div>{error}</div>}
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
            {loading ? "Updating..." : "Update"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
