import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProductDetails from "./Components/Products/ProductDetails";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
    </Routes>
  </BrowserRouter>
);
