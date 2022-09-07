import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { InvalidPath } from "./InvalidPath";

import { Provider } from "react-redux";
import store from "./store/index";
import CartSection from "./routes/GlobalCart";
import AllProducts from "./routes/AllProducts";
import AddProductForm from "./product-components.js/AddProductForm";
import ViewProduct from "./product-components.js/ViewProduct";

const domain = "dev-1-bh6ydf.us.auth0.com";
const clientid = "Lqi7h98EBRoeZT12yFO79CXSp2a5c18l";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Auth0Provider
              domain={domain}
              clientId={clientid}
              redirectUri={window.location.origin}
            >
              <App />
            </Auth0Provider>
          }
        >
          <Route path="/products" element={<AllProducts />}>
            <Route
              index
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Select a Product</p>
                </main>
              }
            />
          </Route>
          <Route path="products/:productId" element={<ViewProduct />} />
          <Route path="/addproduct" element={<AddProductForm />}></Route>
          <Route path="/addproduct/:productId" element={<AddProductForm />} />
          <Route path="cart" element={<CartSection />} />
          <Route path="*" element={<InvalidPath />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
