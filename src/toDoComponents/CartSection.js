import "antd/dist/antd.css";
import PageHeader from "antd/lib/page-header";
import { Avatar, List } from "antd";
import { useSelector } from "react-redux";
import CartItemSection from "./CartItemSection";
import classes from "./Cart.module.css";

const CartSection = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <>
      <section>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            className="site-page-header"
            ghost={false}
            onBack={() => window.history.back()}
            title="Shopping Cart"
          ></PageHeader>
        </div>
        {cartItems.length > 0 && (
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => <CartItemSection item={item} />}
          ></List>
        )}
      </section>
    </>
  );
};
export default CartSection;
