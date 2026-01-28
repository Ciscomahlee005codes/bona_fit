import React from 'react'
import { useState } from "react";
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import About from './Components/About/About'
import Products from './Components/Products/Products'
import Order from './Components/Order/Order'
import Testimonials from './Components/Testimonials/Testimonials';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
function App() {
   const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <>
    <Navbar />
    <Hero />
    <About />
      <Products setSelectedProduct={setSelectedProduct} />
      <Order selectedProduct={selectedProduct} />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default App
