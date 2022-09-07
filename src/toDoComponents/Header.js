import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authStore";
import { cartToggleActions } from "../store/cartToggleStore";
import classes from "./CartButton.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const isAuthUser = useSelector((state) => state.auth.isAutheticated);
  const isCartVisible = useSelector((state) => state.cartToggle.isCartVisible);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const toggleCartHandler = () => {
    dispatch(cartToggleActions.toggle());
  };
  return (
    <div className="site-page-header ">
      <h1>Redux Auth</h1>
      {isAuthenticated && (
        <nav>
          <Link to="/">Home</Link>| <Link to="/products">Products</Link> |{" "}
          <Link to="/cart">Cart</Link>{" "}
          <button onClick={toggleCartHandler} className={classes.button}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalQuantity}</span>
          </button>
          <button onClick={() => logout()}>Logout</button>
        </nav>
      )}
    </div>
  );
};
export default Header;
