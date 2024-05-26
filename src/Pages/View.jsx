import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../App.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
export const View = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const dispach = useDispatch()
  const yourCart = useSelector(state=>state.cartReducer)
  
  useEffect(() => {
    if (localStorage.getItem("allProducts")) {
      const allProducts = JSON.parse(localStorage.getItem("allProducts"));
      setProduct(allProducts.find((item) => item.id == id));
    }
  }, []);
   
  const handleCart =()=>{
    const existingProduct = yourCart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispach(addToCart(product))
      alert("Existing Product quantity is Incrementing")
    }else{
      dispach(addToCart(product))
    }
  }

  const handleWishlist =()=>{
    if(userWishlist?.includes(product)){
      alert("item already in your wishlist!!")
    }else{
      dispach(addToWishlist(product))
    }
  }

  

  return (
    <>
      <Header />
      <div className="view-page">
        <div className="view-box one">
          <div className="img-box">
            <img className="w-100" height={'400vh'}
              src={product?.thumbnail}
              alt="product-img"
            />
          </div>
        </div>
        <div className="view-box two">
          <h5 className="text-dark">PID: {product?.id}</h5>
          <h1>{product?.title}</h1>
          <h3 className="fw-bolder text-danger">$ {product?.price}</h3>
          <p style={{ textAlign: "justify" }}>
            <span className="fw-bolder">Description :</span>{product?.description}
          </p>
          <div className="d-flex justify-content-between mt-3">
            <button onClick={handleWishlist} className="btn btn-outline-dark">
              <i className="fa-solid fa-heart text-danger">Add to wishlist</i>
            </button>
            <button onClick={handleCart}  className="btn btn-outline-dark">
              <i className="fa-solid fa-cart-plus text-success">Add to Cart</i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
