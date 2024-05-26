import React from "react";
import Header from "../components/Header";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
Row;

const Wishlist = () => {

  const myWishlist = useSelector((state) => state.wishlistReducer);
  const ourCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()

 
const handleCart = (product) =>{
  const existingProduct = ourCart?.find(item=>item.id==product.id)
  if(existingProduct){
    dispatch(addToCart(product))
    dispatch(removeWishlistItem(product.id))
    alert("Product quantity is Incrementing")
  }else{
    dispatch(addToCart(product))
    dispatch(removeWishlistItem(product.id))
  }
}
  
  return (
    <>
  <Header />
  {
    myWishlist?.length === 0 ? (
      <div style={{ marginTop: "150px",height:'60vh' }} className="text-center fw-bolder text-danger">
        <img style={{width:'200px'}} src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png' alt="" />
        <h2>No products in your wishlist</h2></div>
    ) : (
      <div style={{ marginTop: "150px" }} className="container-fluid">
        <h3 className="text-danger">Your Wishlist</h3>
        <Row className="my-5">
          {
            myWishlist?.map(product=>(
              <Col key={product.id} className="mb-5 me-2" sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                height={"180px"}
                variant="top"
                src={product?.thumbnail}
              />
              <Card.Body>
                <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
                <div className="d-flex justify-content-around mt-3">
                  <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className="btn">
                    <i className="fa-solid fa-heart-circle-xmark text-danger"></i>
                  </button>
                  <button onClick={()=>handleCart(product)}className="btn">
                    <i className="fa-solid fa-cart-plus text-success"></i>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
            ))
          }
        </Row>
      </div>
    )
  }
</>

    
  );
};

export default Wishlist;
