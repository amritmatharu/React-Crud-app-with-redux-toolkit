import "antd/dist/antd.css";
import { useState } from "react";
import { Avatar, List } from "antd";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "/node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import Icon from "react-crud-icons";
import { deleteProduct } from "../store/product-actions";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const deleteItemHandler = () => {
    dispatch(deleteProduct(item.id));
  };

  return (
    <>
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={item.name}
          description={item.description}
        />
        <div>
          <span className="price">${parseInt(item.price, 10).toFixed(2)}</span>{" "}
        </div>
        <div>
          <NavLink to={`/addproduct/${item.id}`}>
            <Icon name="edit" tooltip="Edit" size="medium" />
          </NavLink>
          <Icon
            onClick={deleteItemHandler}
            name="delete"
            tooltip="Delete"
            size="medium"
          />
          <Link to={`${item.id}`}>
            <Icon name="browse" tooltip="View" size="medium" />
          </Link>
        </div>
      </List.Item>
    </>
  );
};
export default ProductItem;
