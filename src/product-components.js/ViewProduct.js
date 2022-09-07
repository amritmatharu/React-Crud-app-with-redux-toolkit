import "antd/dist/antd.css";
import PageHeader from "antd/lib/page-header";
import { Content } from "antd/lib/layout/layout";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { getProduct } from "../store/product-actions";
import { cartActions } from "../store/cartSlice";
const ImgComponent = React.lazy(() => import("./ImageComponent"));

const ViewProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: product.id,
        name: product.name,
        price: parseInt(product.price, 10),
        description: product.description,
        quantity: product.quantity,
      })
    );
  };
  const productView = (
    <div className="card">
      <Suspense fallback={<h3>Image Loading</h3>}>
        <ImgComponent></ImgComponent>
      </Suspense>
      <div className="container">
        <h4>
          <b>{product.name}</b>
        </h4>
        <div className="product-info">
          <p> {product.description}</p>
          <p>
            <b> ${product.price}</b>
          </p>
          <p> {product.quantity}(QTY)</p>
          <button onClick={addToCartHandler}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    (async () => {
      const productData = await dispatch(getProduct(productId));
      console.log("productData", productData);
      setProduct((prevState) => {
        return {
          ...prevState,
          ...productData,
        };
      });
    })();
  }, [productId]);

  return (
    <div className="view-product-form">
      <PageHeader
        className="site-page-header"
        ghost={false}
        onBack={() => window.history.back()}
        title={`View product ${productId}`}
      ></PageHeader>

      {product ? productView : <h3>In Progress...</h3>}
    </div>
  );
};
export default ViewProduct;
