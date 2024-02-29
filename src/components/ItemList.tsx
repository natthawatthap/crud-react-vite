import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Item } from "../models/Item";
import { ItemListResponse } from "../models/ItemListResponse";
import Pagination from "./Pagination";
import ItemComponent from "./ItemComponent";
import CreateItem from "../components/CreateItem";
import EditItem from "./EditItem";

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const perPage = 2;
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<ItemListResponse> = await axios.get(
        "http://localhost:8000/v1/items",
        {
          params: { page: currentPage, per_page: perPage },
        }
      );
      const { items, pagination } = response.data;
      setItems(items);
      setTotalPages(pagination.total_pages);
      setTotalItems(pagination.total_items);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleItemUpdated = () => {
    fetchItems();
    setEditingItem(null);
    setCurrentPage(1);
  };

  const handleDeleteItem = () => {
    fetchItems();
    setCurrentPage(1);
  };

  return (
    <div>
      <h2>Items</h2>

      {showCreateForm && (
        <CreateItem
          onItemCreated={() => {
            fetchItems();
            setShowCreateForm(false);
          }}
        />
      )}

      {editingItem && (
        <EditItem
          item={editingItem}
          onUpdate={handleItemUpdated}
          onCancel={handleCancelEdit}
        />
      )}

      {!showCreateForm && !editingItem && (
        <div>
          <button onClick={() => setShowCreateForm(true)}>
            Show Create Form
          </button>

          {loading ? (
            <div>Loading...</div>
          ) : items.length === 0 ? (
            <div>No items available.</div>
          ) : (
            <div>
              <ul>
                {items.map((item) => (
                  <ItemComponent
                    key={item._id}
                    item={item}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </ul>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemList;
