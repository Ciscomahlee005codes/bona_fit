import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Products from "./Components/Products/Products";
import Order from "./Components/Order/Order";
import Testimonials from "./Components/Testimonials/Testimonials";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";
import DiscountCountdown from "./Components/DiscountCountdown/DiscountCountdown";
import ProductDetails from "./Components/Products/ProductDetails";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import AdminProductsPage from "./Pages/AdminProductsPage";
import AdminOrdersPage from "./Pages/AdminOrderPage";


function HomeLayout() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (location.state?.scrollTo === "products") {
      const section = document.getElementById("products");
      section?.scrollIntoView({ behavior: "smooth" });
    }

    if (location.state?.scrollTo === "order") {
      if (location.state?.selectedProduct) {
        setSelectedProduct(location.state.selectedProduct);
      }

      const section = document.getElementById("order");
      section?.scrollIntoView({ behavior: "smooth" });
    }

    window.history.replaceState({}, document.title);
  }, [location, loading]);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DiscountCountdown />
        <About />
        <Products />
        <Order selectedProduct={selectedProduct} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      {/* Admin Routes */}
      <Route path="/admin/products" element={<AdminProductsPage />} />
      <Route path="/admin/orders" element={<AdminOrdersPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
    </Routes>
  );
}

export default App;
