import { cartToggleActions } from "./cartToggleStore";
import { productAllActions } from "./product-store";

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const sendDeleteReq = async () => {
      const URL = "http://localhost:3001/products/" + id;
      const requestParam = {
        method: "DELETE",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
      };
      const delProductResponse = await fetch(URL, requestParam);
      if (!delProductResponse.ok) {
        const message = `An error has occured: ${delProductResponse.status}`;
        throw new Error(message);
      }
      const deleteProductResp = await delProductResponse.json();
      return deleteProductResp;
    };
    const deleteProdResp = await sendDeleteReq();
    console.log("Deleted Product: ", deleteProdResp);
    dispatch(productAllActions.deleteProduct(id));
  };
};

export const getProduct = (productId) => {
  return async (dispatch) => {
    const SendProductRequest = async () => {
      const productsResponse = await fetch(
        "http://localhost:3001/products/" + productId
      ); //api for the get request
      if (!productsResponse.ok) {
        const message = `An error has occured: ${productsResponse.status}`;
        throw new Error(message);
      }
      const product = await productsResponse.json();
      console.log("Fetch One Product: ", product);
      return product;
    };
    try {
      const productsData = await SendProductRequest();
      return productsData;
    } catch (error) {
      dispatchNotification(
        dispatch,
        "error",
        "Error!...",
        "Fethcing Product Data Failed....."
      );
    }
  };
};
export const fetchAllProducts = () => {
  return async (dispatch) => {
    const SendProductRequest = async () => {
      const productsResponse = await fetch("http://localhost:3001/products"); //api for the get request
      if (!productsResponse.ok) {
        const message = `An error has occured: ${productsResponse.status}`;
        throw new Error(message);
      }
      const allProducts = await productsResponse.json();
      console.log("Fetch Product: ", allProducts);
      return allProducts;
    };
    try {
      const allProductsData = await SendProductRequest();
      dispatch(productAllActions.replaceProducts(allProductsData));
    } catch (error) {
      dispatchNotification(
        dispatch,
        "error",
        "Error!...",
        "Fethcing Product Data Failed....."
      );
    }
  };
};
export const createNewProduct = (productState) => {
  return async (dispatch) => {
    const sendrequest = async () => {
      console.log("Send New Product Data Action: ", productState);
      const prodResponse = await fetch("http://localhost:3001/products/", {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productState),
      });
      if (!prodResponse.ok) {
        throw new Error("Sending Product New Item Data Failed!");
        dispatchNotification(
          dispatch,
          "error",
          "Error!...",
          "Sending Product New Item Data Failed....."
        );
      }
      const newProductData = await prodResponse.JSON();
      return newProductData;
    };
    try {
      const productData = await sendrequest();
      dispatch(productAllActions.addNewProduct(productData));
      dispatchNotification(
        dispatch,
        "success",
        "Success!...",
        "Sent Product Data Successfully..."
      );
    } catch (error) {
      dispatchNotification(
        dispatch,
        "error",
        "Error!...",
        "Error occurred while sending new Product Data ..."
      );
    }
  };
};
//Edit Form CHnages API call
export const editProduct = (productState) => {
  return async (dispatch) => {
    const sendrequest = async () => {
      console.log("Send New Product Data Action: ", productState);
      const prodResponse = await fetch(
        "http://localhost:3001/products/" + productState.id,
        {
          method: "PUT",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productState),
        }
      );
      if (!prodResponse.ok) {
        throw new Error("Sending Product New Item Data Failed!");
        dispatchNotification(
          dispatch,
          "error",
          "Error!...",
          "Sending Product New Item Data Failed....."
        );
      }
      const productResponse = await prodResponse.JSON();
      return productResponse;
    };
    try {
      const product = await sendrequest();
      dispatch(productAllActions.editProductInState(product));
      dispatchNotification(
        dispatch,
        "success",
        "Success!...",
        "Sent Product Data Successfully..."
      );
    } catch (error) {
      dispatchNotification(
        dispatch,
        "error",
        "Error!...",
        "Sending Product Data Failed..."
      );
    }
  };
};

function dispatchNotification(dispatch, status, title, message) {
  dispatch(
    cartToggleActions.showNotification({
      status,
      title,
      message,
    })
  );
}
