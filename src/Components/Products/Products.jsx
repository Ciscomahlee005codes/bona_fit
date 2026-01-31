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
    name: "Ultra Slim Vibration Plate",
    category: "Vibration Machines",
    image: img1,
    price: "GHS 2,800",
    description:
      "Compact vibration platform for muscle stimulation, fat burning and improved circulation."
  },
  {
    id: 2,
    name: "Crosley Whole Body Vibration",
    category: "Vibration Machines",
    image: img2,
    price: "GHS 6,500",
    description:
      "Professional vibration machine with handles for stability and full-body toning."
  },
  {
    id: 3,
    name: "Multifunction Ab Crunch Bench",
    category: "Strength Equipment",
    image: img3,
    price: "GHS 2,200",
    description:
      "Core workout bench targeting abs, legs and upper body conditioning."
  },
  {
    id: 4,
    name: "Vibration Plate Trainer",
    category: "Vibration Machines",
    image: img4,
    price: "GHS 4,500",
    description:
      "Whole-body vibration platform for muscle activation and recovery."
  },
  {
    id: 5,
    name: "Indoor Spinning Bike",
    category: "Cardio Equipment",
    image: img5,
    price: "GHS 7,000",
    description:
      "Stationary bike for cardio workouts, weight loss and endurance training."
  },
  {
    id: 6,
    name: "Six-Pack Ab Machine",
    category: "Strength Equipment",
    image: img6,
    price: "GHS 2,100",
    description:
      "Multi-function abdominal machine targeting abs, waist and thighs."
  },
  {
    id: 7,
    name: "Advanced Vibration Trainer",
    category: "Vibration Machines",
    image: img7,
    price: "GHS 4,500",
    description:
      "High-performance vibration trainer for toning and balance improvement."
  },
  {
    id: 8,
    name: "Executive Massage Chair",
    category: "Recovery & Wellness",
    image: img8,
    price: "GHS 95,000",
    description:
      "Luxury full-body massage chair for muscle recovery and relaxation."
  }
];

const categories = [
  "All",
  "Vibration Machines",
  "Strength Equipment",
  "Cardio Equipment",
  "Recovery & Wellness"
];

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

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="product-content">
                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <p className="product-desc">
                  {product.description}
                </p>

                <div className="product-bottom">
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
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
