import React, { useState, useEffect  } from "react";
import { useLocation } from "react-router-dom";
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

function App() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
  if (loading) return; // 🚨 IMPORTANT — wait for loader to finish

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

  // Clear navigation state
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
        <Products setSelectedProduct={setSelectedProduct} />
        <Order selectedProduct={selectedProduct} />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
