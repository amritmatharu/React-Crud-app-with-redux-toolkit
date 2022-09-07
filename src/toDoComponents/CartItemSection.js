import "antd/dist/antd.css";
import { Avatar, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";
import classes from "./CartItem.module.css";
import { useEffect } from "react";

let initial = true;
function CartItemSection({ item }) {
  const dispatch = useDispatch();
  const addItemToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        price: item.price,
        name: item.id,
        description: item.description,
      })
    );
  };
  const removeItemFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(item.id));
  };

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={item.name}
        description={item.description}
      />
      <div>
        {" "}
        <span className="price">${item.totalPrice.toFixed(2)}</span>{" "}
        <span className="price">(${item.price.toFixed(2)}/item)</span>{" "}
        <span className="price">x {item.quantity}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={removeItemFromCartHandler}>-</button>
        <button onClick={addItemToCartHandler}>+</button>
      </div>
    </List.Item>
  );
}
export default CartItemSection;
