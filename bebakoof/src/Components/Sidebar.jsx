import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./SidebarStyles.css";
const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.getAll("category");
  const initialSort = searchParams.getAll("sort");
  const [category, setCategory] = useState(initialCategory || []);
  const [sort, setSort] = useState(initialSort[0] || "");
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  const handleChange = (e) => {
    const newCategory = [...category];

    if (newCategory.includes(e.target.value)) {
      newCategory.splice(newCategory.indexOf(e.target.value), 1);
    } else {
      newCategory.push(e.target.value);
    }
    setCategory(newCategory);
  };

  useEffect(() => {
    let params = {};
    params.category = category;
    sort && (params.sort = sort);
    setSearchParams(params);
  }, [category, setSearchParams, sort]);
  const products = useSelector((store) => store.DataReducer.products);
  return (
    <div className="sidebar-container">
      <p className="heading">
        Men Clothing <span>( {products.length} )</span>
       
      </p>
      <hr />
      <div className="inside-container">
        <div>
          <h4>Filter By Categories </h4>
          <div>
           
            <div>
              <input
                type="checkbox"
                value="shirt"
                onChange={handleChange}
                checked={category.includes("shirt")}
              />
              <label>Shirt</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="t-shirt"
                onChange={handleChange}
                checked={category.includes("t-shirt")}
              />
              <label>T-shirt</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="jeans"
                onChange={handleChange}
                checked={category.includes("jeans")}
              />
              <label>Jeans</label>
            </div>
            <div>
              <input
                type="checkbox"
                value="kurta"
                onChange={handleChange}
                checked={category.includes("kurta")}
              />
              <label>Kurta</label>
            </div>
          </div>
        </div>
        <h4 style={{marginTop:"40px", marginBottom:"20px", textDecoration:"underline"}}>SORT</h4>
        <div onChange={handleSort}>
          <input
            type="radio"
            value="asc"
            name="sortBy"
            defaultChecked={sort === "asc"}
          />
          <label>Low-to-High</label>
          <br />
          <input
            type="radio"
            value="desc"
            name="sortBy"
            defaultChecked={sort === "desc"}
          />
          <label>High-to-Low</label>
          <br />
          <input
            type="radio"
            value=""
            name="sortBy"
            defaultChecked={sort === ""}
          />
          <label>Popular</label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
