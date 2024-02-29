import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Item } from "../models/Item";
import { ItemListResponse } from "../models/ItemListResponse";
import Pagination from "./Pagination"; // Import the Pagination component

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const perPage = 2;

  useEffect(() => {
    const fetchItems = async () => {
      try {
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
        setLoading(false);
      }
    };

    setLoading(true);
    fetchItems();
  }, [currentPage]); // Update items when currentPage changes

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <h2>Items</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <div>Name: {item.name}</div>
              <div>Description: {item.description}</div>
              <div>Price: {item.price}</div>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default ItemList;
