import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Item } from "../models/Item";
import { ItemListResponse } from "../models/ItemListResponse";
import Pagination from "./Pagination";
import CreateItem from "../components/CreateItem";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem"; // Import the DeleteItem component

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const perPage = 2;
  const [editingItem, setEditingItem] = useState<Item | null>(null); // Track the item being edited

  useEffect(() => {
    fetchItems(); // Fetch items when component mounts or currentPage changes
  }, [currentPage]);

  const fetchItems = async () => {
    try {
      setLoading(true); // Set loading state to true when fetching items
      const response: AxiosResponse<ItemListResponse> = await axios.get(
        "http://localhost:8000/v1/items",
        {
          params: { page: currentPage, per_page: perPage },
        }
      );
      console.log(response.data);
      const { items, pagination } = response.data;
      setItems(items);
      setTotalPages(pagination.total_pages); // Calculate total pages
      setTotalItems(pagination.total_items);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false); // Set loading state to false after fetching items
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item); // Set the item to be edited
  };

  const handleCancelEdit = () => {
    setEditingItem(null); // Clear the editing state
  };

  const handleItemUpdated = () => {
    fetchItems();
    setEditingItem(null); // Clear the editing state after item is updated
    setCurrentPage(1); // Refresh the list after update
  };

  const handleDeleteItem = () => {
    fetchItems(); // Refetch items after deletion
    setCurrentPage(1); // Refresh the list after deletion
  };

  return (
    <div>
      <h2>Items</h2>
      <CreateItem onItemCreated={fetchItems} />
      {editingItem ? (
        <EditItem
          item={editingItem}
          onUpdate={handleItemUpdated}
          onCancel={handleCancelEdit}
        />
      ) : loading ? (
        <div>Loading...</div>
      ) : items.length === 0 ? (
        <div>No items available.</div>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                <div>Name: {item.name}</div>
                <div>Description: {item.description}</div>
                <div>Price: {item.price}</div>
                <button onClick={() => handleEditItem(item)}>Edit</button>
                <DeleteItem itemId={item._id} onDelete={handleDeleteItem} />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </>
      )}
    </div>
  );
};

export default ItemList;
