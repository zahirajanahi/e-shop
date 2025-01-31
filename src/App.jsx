import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";

import "./index.css";
import Landing from "./pages/landing";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Home />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;
