import { useParams, useNavigate } from "react-router-dom";
import { productData } from "../../productData";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = productData.find((p) => p.slug === slug);

  if (!product) {
    return <h2 style={{ color: "white" }}>Product not found</h2>;
  }

  // 🔥 Discount Logic (20%)
  const discountPercentage = 20;
  const oldPrice = product.price;
  const newPrice = Math.round(oldPrice - (oldPrice * discountPercentage) / 100);

  return (
    <section className="product-details">
      <div className="details-container">

        <button
          className="back-btn"
          onClick={() => {
            navigate("/", { state: { scrollTo: "products" } });
          }}
        >
          ← Back to Products
        </button>

        <div className="details-grid">

          {/* IMAGE SIDE */}
          <div className="details-image">
            <span className="discount-badge">-20%</span>
            <img src={product.image} alt={product.name} />
          </div>

          {/* INFO SIDE */}
          <div className="details-info">
            <span className="details-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            {/* PRICE SECTION */}
            <div className="price-wrapper">
              <span className="new-price">
                GHS {newPrice.toLocaleString()}
              </span>
              <span className="old-price">
                GHS {oldPrice.toLocaleString()}
              </span>
            </div>

            {/* DELIVERY INFO */}
            <div className="delivery-info">
              🚚 Delivery: 2 - 4 Working Days
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <button
              className="details-order-btn"
              onClick={() => {
                const message = `
Hello, I am interested in this product:

Product: ${product.name}
Discounted Price: GHS ${newPrice.toLocaleString()}
Old Price: GHS ${oldPrice.toLocaleString()}
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
    </section>
  );
};

export default ProductDetails;
