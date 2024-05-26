import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  decQuantity,
  emptyCart,
  incQuantity,
  removeCartItem,
} from "../redux/slices/cartSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Cart = () => {
  const ourCart = useSelector((state) => state.cartReducer);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    if (ourCart?.length > 0) {
      setCartTotal(
        ourCart?.map((item) => item.totalPrice).reduce((t1, t2) => t1 + t2)
      );
    } else {
      setCartTotal(0);
    }
  }, [ourCart]);
  const myCartlist = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      dispatch(decQuantity(product.id));
    } else {
      dispatch(removeCartItem(product.id));
    }
  };
  const navigate = useNavigate();
  const checkout = () => {
    dispatch(emptyCart());
    alert("Order placed successfully. Thank you for purchasing with us!!");
    navigate("/");
  };
  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }} className="container">
        {myCartlist?.length === 0 ? (
          <div
            style={{ marginTop: "150px", height: "60vh" }}
            className="text-center fw-bolder text-danger"
          >
            <img
              style={{ width: "200px" }}
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="Empty Cart"
            />
            <h2>No products in your Cart</h2>
          </div>
        ) : (
          <div className="cart">
            <h1>Cart Summary</h1>
            <div className="row mt-4">
              <div className="col-lg-8">
                <table className="table shadow">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th></th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCartlist?.map((product, index) => (
                      <tr key={product?.id}>
                        <td>{index + 1}</td>
                        <td>{product?.title.slice(0, 20)}...</td>
                        <td>
                          <img
                            width={"50px"}
                            height={"50px"}
                            src={product?.thumbnail}
                            alt={product?.title}
                          />
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              onClick={() => handleDecrement(product)}
                              className="btn fw-bolder"
                            >
                              -
                            </button>
                            <input
                              value={product?.quantity}
                              style={{ width: "50px" }}
                              className="fw-bolder ms-1"
                              type="text"
                              readOnly
                            />
                            <button
                              onClick={() => dispatch(incQuantity(product?.id))}
                              className="btn fw-bolder"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>$ {product?.totalPrice}</td>
                        <td>
                          <button
                            onClick={() =>
                              dispatch(removeCartItem(product?.id))
                            }
                            className="btn"
                          >
                            <i className="fa-solid fa-trash text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="float-end mb-2">
                  <button
                    onClick={() => dispatch(emptyCart())}
                    className="btn btn-danger me-2"
                  >
                    EMPTY CART
                  </button>
                  <Link to={"/"} className="btn btn-primary me-2">
                    SHOP MORE
                  </Link>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="border rounder shadow p-3">
                  <h4>
                    Total Amount :
                    <span className="text-danger">$ {cartTotal}</span>
                  </h4>
                  <hr />
                  <div className="d-grid">
                    
                    <button onClick={checkout} className="btn btn-success ">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
