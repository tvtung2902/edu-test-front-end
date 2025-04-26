import { Card, Typography, Button } from "antd";
import CategoryList from "./categoryList";
import CategorySearch from "./categorySearch";
import CategoryPagination from "./categoryPagination";
import ModalAdd from "./modalAdd";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between shadow-box-white">
        <CategorySearch />
        <ModalAdd />
      </div>
      <div className="!rounded-lg shadow-box-white">
        <CategoryList />
      </div>
    </div>
  );
}
