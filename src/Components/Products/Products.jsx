import { useState } from "react";
import "./Products.css";

import img1 from "../../assets/gym-equ1.jpeg";
import img2 from "../../assets/gym-equ2.jpeg";
import img3 from "../../assets/gym-equ3.jpeg";
import img4 from "../../assets/gym-equ4.jpeg";
import img5 from "../../assets/gym-equ5.jpeg";
import img6 from "../../assets/gym-equ6.jpeg";
import img7 from "../../assets/gym-equ7.jpeg";
import img8 from "../../assets/gym-equ8.jpeg";

const productData = [
  {
    id: 1,
    name: "Adjustable Dumbbells",
    category: "Dumbbells",
    image: img1,
    price: "₦85,000",
    description: "High-quality adjustable dumbbells for strength training."
  },
  {
    id: 2,
    name: "Commercial Treadmill",
    category: "Machines",
    image: img2,
    price: "₦950,000",
    description: "Heavy-duty treadmill built for endurance workouts."
  },
  {
    id: 3,
    name: "Olympic Barbell",
    category: "Bars",
    image: img3,
    price: "₦120,000",
    description: "Durable Olympic barbell for professional lifting."
  },
  {
    id: 4,
    name: "Bench Press Station",
    category: "Machines",
    image: img4,
    price: "₦450,000",
    description: "Stable and adjustable bench press station."
  },
  {
    id: 5,
    name: "Squat Rack",
    category: "Machines",
    image: img5,
    price: "₦380,000",
    description: "Heavy-duty rack for professional squat training."
  },
  {
    id: 6,
    name: "Weight Plates Set",
    category: "Bars",
    image: img6,
    price: "₦210,000",
    description: "Complete weight plates set for serious lifters."
  },
  {
    id: 7,
    name: "Home Gym Machine",
    category: "Machines",
    image: img7,
    price: "₦1,200,000",
    description: "All-in-one gym system for home training."
  },
  {
    id: 8,
    name: "Kettlebell Set",
    category: "Dumbbells",
    image: img8,
    price: "₦95,000",
    description: "Premium kettlebells for strength & conditioning."
  }
];

const categories = ["All", "Dumbbells", "Machines", "Bars"];

const Products = ({ setSelectedProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? productData
      : productData.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <section className="products" id="products">
      <div className="products-container">

        <h2>
          OUR <span>PRODUCTS</span>
        </h2>

        {/* FILTER BUTTONS */}
        <div className="filter-buttons">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={
                selectedCategory === cat ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="product-content">
                <h3>{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <p className="product-price">{product.price}</p>

                <button
                  className="order-btn"
                  onClick={() => {
                    setSelectedProduct(product.name);
                    document
                      .getElementById("order")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;
