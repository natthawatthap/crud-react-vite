import React from "react";
import axios from "axios";

interface DeleteItemProps {
  itemId: string;
  onDelete: () => void; // Function to call after item is deleted
}

const DeleteItem: React.FC<DeleteItemProps> = ({ itemId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/v1/items/${itemId}`);
      onDelete(); // Call the function to update the list after deletion
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting the item.");
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteItem;
