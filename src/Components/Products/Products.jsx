import { useState } from "react";
import "./Products.css";

import img1 from "../../assets/gym-1.jpg";
import img2 from "../../assets/gym-2.jpg";
import img3 from "../../assets/gym-3.jpg";

const productData = [
  {
    id: 1,
    name: "Adjustable Dumbbells",
    category: "Dumbbells",
    image: img1,
    description: "High-quality adjustable dumbbells for strength training."
  },
  {
    id: 2,
    name: "Commercial Treadmill",
    category: "Machines",
    image: img2,
    description: "Heavy-duty treadmill built for endurance workouts."
  },
  {
    id: 3,
    name: "Olympic Barbell",
    category: "Bars",
    image: img3,
    description: "Durable Olympic barbell for professional lifting."
  },
  {
    id: 4,
    name: "Bench Press Station",
    category: "Machines",
    image: img1,
    description: "Stable and adjustable bench press station."
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
              <div className="card-inner">
                {/* FRONT */}
                <div className="card-front">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                </div>

                {/* BACK */}
                <div className="card-back">
                  <p>{product.description}</p>
                  <button
  className="order-btn"
  onClick={() => {
    setSelectedProduct(product.name);
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  }}
>
  Order Now
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
