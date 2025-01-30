import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";

import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
