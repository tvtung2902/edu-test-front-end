import { useState } from "react";
import { Link } from "react-router-dom";
import "./content-header.scss";

export default function ContentHeader() {
  const [activeTab, setActiveTab] = useState("/questions"); // Mặc định chọn "Câu hỏi"

  return (
    <div className="content-header">
      <div className="content-header__wrapper container">
        <h1 className="content-header__title">Title</h1>
        <div className="content-header__list">
          <Link to="/questions">
            <div
              className={`content-header__item ${activeTab === "/questions" ? "content-header__item--active" : ""
                }`}
              onClick={() => setActiveTab("/questions")}
            >
              Câu hỏi
            </div>
          </Link>
          <Link to="/questions/categories">
            <div
              className={`content-header__item ${activeTab === "/questions/categories" ? "content-header__item--active" : ""
                }`}
              onClick={() => setActiveTab("/questions/categories")}
            >
              Danh Mục
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}