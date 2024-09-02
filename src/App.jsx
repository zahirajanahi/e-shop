import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import MoreProducts from "./pages/MoreProducts"; 
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/more-products" element={<MoreProducts />} />
    </Routes>
  );
}

export default App;
