import React from "react";
import { Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchProduct } from "../redux/slices/productSlice";

const Header = ({ insideHome }) => {
  const dispatch = useDispatch();
  const yourWishlist = useSelector(state=>state.wishlistReducer)

  const yourCart = useSelector(state=>state.cartReducer)
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-info w-100 position-fixed top-0"
        style={{ zIndex: "10" }}
      >
        <Container>
          <Navbar.Brand>
            <Link
              className="fw-bolder"
              to={"/"}
              style={{ color: "white", textDecoration: "none" }}
            >
              <i className="fa-solid fa-cart-plus"></i>FF Store
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {insideHome && (
                <Nav.Link>
                  <input
                    onChange={(e) =>
                      dispatch(searchProduct(e.target.value.toLowerCase()))
                    }
                    type="text"
                    style={{ width: "500px" }}
                    className="rounded p-1"
                    placeholder="SearchProducts Here!!"
                  />
                </Nav.Link>
              )}
              <Nav.Link>
                <Link
                  className="fw-bolder"
                  style={{ color: "white", textDecoration: "none" }}
                  to={"/Wishlist"}
                >
                  <i className="fa-solid fa-heart text-danger"></i>Wishlist
                  <Badge>{yourWishlist.length}</Badge>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  className="fw-bolder"
                  style={{ color: "white", textDecoration: "none" }}
                  to={"/Cart"}
                >
                  <i className="fa-solid fa-cart-plus text-success"></i>Cart
                  <Badge>{yourCart?.length}</Badge>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
