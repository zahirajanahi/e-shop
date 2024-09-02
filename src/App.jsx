import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import MoreProducts from "./pages/MoreProducts";
import ProductDetails from "./pages/ProductDetails"; 
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/more-products" element={<MoreProducts />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
