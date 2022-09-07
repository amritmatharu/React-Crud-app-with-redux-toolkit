import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./toDoComponents/Header";
import Home from "./Home";
import { Link } from "react-router-dom";
import Auth from "./toDoComponents/Auth";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./toDoComponents/Notification";
import { useEffect } from "react";
import { FetchCartData, sendCartData } from "./store/cart-actions";
import { createNewProduct, fetchAllProducts } from "./store/product-actions";
import { useAuth0 } from "@auth0/auth0-react";
import { authActions } from "./store/authStore";

let initial = true;
function App() {
  const isAuthUser = useSelector((state) => state.auth.isAutheticated);
  const cart = useSelector((state) => state.cart);
  const isCartChanged = useSelector((state) => state.cart.cartChanged);
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  //Product Store Slices
  const productState = useSelector((state) => state.product);

  const isProductsChanged = useSelector(
    (state) => state.product.isProductsChanged
  );

  const dispatch = useDispatch();
  const showNotification = useSelector(
    (state) => state.cartToggle.notification
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(authActions.login());
      dispatch(FetchCartData());
      dispatch(fetchAllProducts());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    console.log("Cart Changed: ", isCartChanged);
    console.log("Send updated Cart data: ", cart);
    if (isCartChanged) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  //On Products Array change send request to server to sync

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (isProductsChanged) {
      dispatch(createNewProduct(productState));
    }
  }, [productState, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  return (
    <>
      {showNotification && (
        <Notification
          status={showNotification.status}
          title={showNotification.title}
          message={showNotification.message}
        />
      )}
      <Header />
      {!isAuthenticated && <Auth />}
      {isAuthenticated && <Home user={user} />}
      <Outlet />
    </>
  );
}
export default App;
