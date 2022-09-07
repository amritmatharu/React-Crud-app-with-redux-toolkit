import "antd/dist/antd.css";
import { Avatar, List } from "antd";
import React from "react";
import { useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/product-actions";
import ProductItem from "../product-components.js/ProductItem";
import "../css/all-products.css";
import PageHeader from "antd/lib/page-header";
import Button from "antd/lib/button";
import { NavLink } from "react-router-dom";

//Product CRUD Component
const AllProducts = () => {
  const allProducts = useSelector((state) => state.product.products);
  console.log("allProducts: ", allProducts);
  const isLoading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  var productListHeader = (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="ProductList"
        extra={
          <NavLink to="/addproduct" key="3">
            Add Product
          </NavLink>
        }
      ></PageHeader>
    </div>
  );
  return (
    <div className="all-products-list">
      {isLoading && <div className="todo-div">"Loading!! Please wait"</div>}
      {!isLoading && (
        <List
          header={productListHeader}
          itemLayout="horizontal"
          dataSource={allProducts}
          renderItem={(item) => <ProductItem item={item} />}
        ></List>
      )}
    </div>
  );
};
export default AllProducts;
