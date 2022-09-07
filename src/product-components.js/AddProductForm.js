import "antd/dist/antd.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "antd/lib/page-header";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { productAllActions } from "../store/product-store";
import {
  createNewProduct,
  editProduct,
  getProduct,
} from "../store/product-actions";

const formValid = (id, name, desc, price, qty) => {
  if (!id.trim() || !name.trim() || !desc.trim() || !price || !qty) {
    return false;
  } else {
    return true;
  }
};
const AddProductForm = () => {
  const { productId } = useParams();
  const isAddMode = !productId;
  const [item, setItem] = useState("");
  const [itemId, setItemId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [serverError, setServerError] = useState("");
  const [isError, setIsError] = useState({
    itemIdErr: "",
    itemErr: "",
    descriptionErr: "",
    priceErr: "",
    quantityErr: "",
  });
  const dispatch = useDispatch();
  const actionMode = useSelector((state) => state.action);
  const navigate = useNavigate();
  //Form Submission dor Add Product
  const addProductHandler = (e) => {
    e.preventDefault();
    if (formValid(itemId, item, description, price, quantity)) {
      console.log("Form is valid");
      dispatch(
        createNewProduct({
          name: item,
          id: itemId,
          description,
          price,
          quantity,
        })
      );
      resetForm();
    } else {
      console.log("Form is invalid!");
    }
  };
  //Form Submission dor Edit Product
  const editProductHandler = (e) => {
    e.preventDefault();
    if (formValid(itemId, item, description, price, quantity)) {
      console.log("Form is valid");
      dispatch(
        editProduct({
          id: itemId,
          name: item,
          price,
          quantity,
          description,
        })
      );
      resetForm();
      //navigate("/products");
    } else {
      console.log("Form is invalid!");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && item.trim()) {
      if (formValid(itemId, item, description, price, quantity)) {
        console.log("Form is valid");
        dispatch(
          editProduct({
            id: itemId,
            name: item,
            price,
            quantity,
            description,
          })
        );
        resetForm();
      } else {
        console.log("Form is invalid!");
      }
    }
  };
  const resetForm = () => {
    setItem("");
    setItemId("");
    setDescription("");
    setQuantity("");
    setPrice("");
    setIsError({
      itemIdErr: "",
      itemErr: "",
      descriptionErr: "",
      priceErr: "",
      quantityErr: "",
    });
  };
  const formValChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    //const isError = { ...isError };
    switch (name) {
      case "item":
        setItem(value);
        isError.itemErr =
          value.length < 4 ? "Atleast 4 characaters required" : "";
        break;
      case "itemId":
        setItemId(value);
        isError.itemIdErr = value.length < 0 ? "Product Id is required" : "";
        break;
      case "description":
        setDescription(value);
        isError.descriptionErr =
          value.length < 0 ? "Description is required" : "";
        break;
      case "price":
        setPrice(value);
        isError.priceErr = value.length < 0 ? "Price is required" : "";
        break;
      case "quantity":
        setQuantity(value);
        isError.quantityErr = value.length < 0 ? "Quantity is required" : "";
        break;
      default:
        break;
    }
    setIsError({
      ...isError,
      [name]: value,
    });
  };
  const newProduct = (name, id, desc, priceProduct, qty) => {
    return {
      id: id,
      name: name,
      description: desc,
      price: parseInt(priceProduct, 10),
      quantity: parseInt(qty, 10),
    };
  };
  // Fetch A Product if Edit Mode
  useEffect(() => {
    (async () => {
      if (!isAddMode) {
        const productData = await dispatch(getProduct(productId));
        console.log("productData", productData);
        const { id, name, description, price, quantity } = productData;
        setItem(name);
        setItemId(id);
        setDescription(description);
        setQuantity(quantity);
        setPrice(price);
      }
    })();
  }, []);

  return (
    <>
      <Content>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            className="site-page-header"
            ghost={false}
            onBack={() => window.history.back()}
            title={isAddMode ? "Add Product Form" : "Edit Product Form"}
          ></PageHeader>
        </div>

        {serverError && (
          <span className="invalid-feedback">Server Error: {serverError}</span>
        )}
        <form
          className="add-product-form"
          onSubmit={isAddMode ? addProductHandler : editProductHandler}
        >
          <div className="form-group">
            <label>Product Id: </label>
            <input
              readOnly={!isAddMode}
              placeholder="Enter an Product ID"
              value={itemId}
              type="number"
              name="itemId"
              onChange={formValChange}
            />
            {isError.itemIdErr.length > 0 && (
              <span className="invalid-feedback">{isError.itemIdErr}</span>
            )}
          </div>
          <div className="form-group">
            <label>Product Name: </label>
            <input
              onKeyDown={handleKeyDown}
              placeholder="Enter an Product Name"
              value={item}
              type="text"
              name="item"
              onChange={formValChange}
            />
            {isError.itemErr.length > 0 && (
              <span className="invalid-feedback">{isError.itemErr}</span>
            )}
          </div>

          <div className="form-group">
            <label>Product Description:</label>
            <textarea
              onKeyDown={handleKeyDown}
              placeholder="Enter an Product Name"
              value={description}
              type="text"
              name="description"
              onChange={formValChange}
            />
            {isError.descriptionErr.length > 0 && (
              <span className="invalid-feedback">{isError.descriptionErr}</span>
            )}
          </div>
          <div className="form-group">
            <label>Product Price:</label>
            <input
              onKeyDown={handleKeyDown}
              placeholder="Enter an Product price"
              value={price}
              type="number"
              name="price"
              onChange={formValChange}
            />
            {isError.priceErr.length > 0 && (
              <span className="invalid-feedback">{isError.priceErr}</span>
            )}
          </div>
          <div className="form-group">
            <label>Product Quantity:</label>
            <input
              onKeyDown={handleKeyDown}
              placeholder="Enter an Product quantity"
              value={quantity}
              type="number"
              name="quantity"
              onChange={formValChange}
            />
            {isError.quantityErr.length > 0 && (
              <span className="invalid-feedback">{isError.quantityErr}</span>
            )}
          </div>
          <button type="submit">{isAddMode ? "Add" : "Edit"}</button>
        </form>
      </Content>
    </>
  );
};
export default AddProductForm;
