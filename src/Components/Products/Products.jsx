import { useState, useEffect } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const categories = [
  "All",
  "Vibration Machines",
  "Strength Equipment",
  "Cardio Equipment",
  "Recovery & Wellness"
];

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Products From Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
      } else {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  if (loading) {
    return (
      <section className="products">
        <h2 style={{ color: "white", textAlign: "center" }}>
          Loading Products...
        </h2>
      </section>
    );
  }

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
                selectedCategory === cat
                  ? "filter-btn active"
                  : "filter-btn"
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
                  <p className="product-price">
                    GHS {product.price.toLocaleString()}
                  </p>

                  <button
                    className="order-btn"
                    onClick={() =>
                      navigate(`/product/${product.slug}`)
                    }
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
