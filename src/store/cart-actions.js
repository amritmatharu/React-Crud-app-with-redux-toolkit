import { cartActions } from "./cartSlice";
import { cartToggleActions } from "./cartToggleStore";

export const FetchCartData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:3001/cart/");
      if (!response.ok) {
        throw new Error("Fetch Cart Data Request Failed!");
      }
      const fetchCartData = await response.json();
      console.log("Fetch Cart Data: ", fetchCartData);
      return fetchCartData;
    };
    try {
      const cartData = await sendRequest();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        cartToggleActions.showNotification({
          status: "error",
          title: "Error!...",
          message: "Sending Cart Data Failed...",
        })
      );
    }
  };
};
export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      cartToggleActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending Cart Data...",
      })
    );
   
    const sendrequest = async () => {
      console.log("Send Cart Data from Cart Actions: ", cartData);
      const cartResponse = await fetch("http://localhost:3001/cart/", {
        method: "PUT",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });
      if (!cartResponse.ok) {
        throw new Error("Sending Cart Item Data Failed!");
        dispatch(
          cartToggleActions.showNotification({
            status: "error",
            title: "Error!...",
            message: "Sending Cart Data Failed...",
          })
        );
      }
    };
    try {
      await sendrequest();

      dispatch(
        cartToggleActions.showNotification({
          status1: "success",
          title: "Success...",
          message: "Sent Cart Data Successfully...",
        })
      );
    } catch (error) {
      dispatch(
        cartToggleActions.showNotification({
          status: "error",
          title: "Error!...",
          message: "Sending Cart Data Failed...",
        })
      );
    }
  };
};
