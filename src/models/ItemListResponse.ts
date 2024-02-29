import { Item } from "./Item";
import { Pagination } from "./Pagination";
export interface ItemListResponse {
  items: Item[];
  pagination: Pagination;
}
