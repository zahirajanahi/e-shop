import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CoffeeProvider } from "./context/coffeeContext"; 
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CoffeeProvider>
      <App />
    </CoffeeProvider>
  </BrowserRouter>
);
