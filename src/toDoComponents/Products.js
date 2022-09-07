import { useContext } from "react";
import { Link, NavLink, Outlet, useSearchParams } from "react-router-dom";
import { ProductContext } from "./AddProductProvider";
import { deleteProduct } from "./ProductActions";
import Icon from "react-crud-icons";
import "/node_modules/react-crud-icons/dist/css/react-crud-icons.css";
//Products Component
const Products = (props) => {
  const { items } = props;
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatchAction = useContext(ProductContext);
  const deleteProductHandler = (itemId) => {
    deleteProduct(dispatchAction, itemId);
  };
  const onChangeHandler = (e) => {
    const { value } = e.target;
    if (value) {
      setSearchParams({ filter: value });
    } else {
      setSearchParams({});
    }
  };
  return (
    <div className="todo-div">
      <nav
        style={({ isActive }) => {
          return {
            display: "block",
            margin: "1rem 0",
            color: isActive ? "red" : "",
          };
        }}
        style={{ border: "solid 1px", padding: "1rem" }}
      >
        <NavLink className="add-product" to="/addproduct">
          Add Product
        </NavLink>
        <input type="search" onChange={onChangeHandler} />
        {items &&
          items.length > 0 &&
          items
            .filter((item) => {
              const filter = searchParams.get("filter");
              if (!filter) {
                return true;
              }
              return item.productName
                .toLowerCase()
                .startsWith(filter.toLowerCase());
            })
            .map((item) => (
              <div
                style={{
                  margin: "1rem 0",
                }}
                className="list-items"
                key={item.id}
              >
                <NavLink
                  className="left-li"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to={`products/${item.id}`}
                >
                  <span>{item.productName}</span>
                </NavLink>
                <div className="right-li">
                  <NavLink to={`/addproduct/${item.id}`}>
                    <Icon name="edit" tooltip="Edit" size="medium" />
                  </NavLink>
                  <button onClick={() => deleteProductHandler(item.id)}>
                    <Icon name="delete" tooltip="Edit" size="medium" />
                  </button>
                </div>
              </div>
            ))}
      </nav>
      <Outlet />
    </div>
  );
};
export default Products;
