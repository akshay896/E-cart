import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Footer from "./components/Footer";
import { View } from "./Pages/View";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/:id/view" element={<View />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
