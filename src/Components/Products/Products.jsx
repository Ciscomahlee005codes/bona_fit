import { useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { productData } from "../../../productData";


const categories = [
  "All",
  "Vibration Machines",
  "Strength Equipment",
  "Cardio Equipment",
  "Recovery & Wellness"
];


const Products = ({ setSelectedProduct }) => {
  const navigate = useNavigate();
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
                  <p className="product-price">GHS {product.price}</p>

                  <button
  className="order-btn"
  onClick={() => navigate(`/product/${product.slug}`)}
>
  View Details
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
