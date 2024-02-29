import React, { useState } from "react";
import axios from "axios";
import { Item } from "../models/Item"; // Import the Item interface

const CreateItem: React.FC = () => {
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
      // Reset form fields after successful submission
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

  return (
    <div>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
