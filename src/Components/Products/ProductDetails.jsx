import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.log(error);
      } else {
        setProduct(data);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  if (!product) {
    return <h2 style={{ color: "white" }}>Product not found</h2>;
  }

  // 🔥 Discount Logic (20%)
  const discountPercentage = 20;
  const oldPrice = product.price;
  const newPrice = Math.round(
    oldPrice - (oldPrice * discountPercentage) / 100
  );

  return (
    <section className="product-details">
      <div className="details-container">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/", { state: { scrollTo: "products" } })
          }
        >
          ← Back to Products
        </button>

        <div className="details-grid">

          <div className="details-image">
            <span className="discount-badge">-20%</span>
            <img src={product.image} alt={product.name} />
          </div>

          <div className="details-info">
            <span className="details-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <div className="price-wrapper">
              <span className="new-price">
                GHS {newPrice.toLocaleString()}
              </span>
              <span className="old-price">
                GHS {oldPrice.toLocaleString()}
              </span>
            </div>

            <div className="delivery-info">
              🚚 Delivery: 2 - 4 Working Days
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="details-buttons">

              <button
                className="details-order-btn primary-btn"
                onClick={() =>
                  navigate("/", {
                    state: {
                      scrollTo: "order",
                      selectedProduct: product.name
                    }
                  })
                }
              >
                Order Now
              </button>

              <button
                className="details-order-btn whatsapp-btn"
                onClick={() => {
                  const message = `
Hello, I am interested in this product:

Product: ${product.name}
Discounted Price: GHS ${newPrice.toLocaleString()}
Category: ${product.category}

Please provide more details.
                  `;

                  const whatsappNumber = "2347084106254";
                  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                  window.open(url, "_blank");
                }}
              >
                Order via WhatsApp
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
