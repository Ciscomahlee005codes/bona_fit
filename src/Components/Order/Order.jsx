import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import "./Order.css";

const whatsappNumber = "2347084106254";

const Order = ({ selectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

   const [formData, setFormData] = useState({
  name: "",
  phone: "",
  product: "",
  quantity: 1,
  address: ""
});


  // 🔥 Fetch products dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("name")
        .order("name");

      if (!error) {
        setProducts(data);
      }

      setLoadingProducts(false);
    };

    fetchProducts();
  }, []);

  // 🔥 Auto-fill selected product
   useEffect(() => {
  if (selectedProduct) {
    setFormData((prev) => ({
      ...prev,
      product: selectedProduct,
      quantity: 1
    }));
  }
}, [selectedProduct]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // ✅ Save order to Supabase
    const { error } = await supabase.from("orders").insert([
      {
        name: formData.name,
        phone: formData.phone,
        product: formData.product,
        quantity: formData.quantity,
        address: formData.address
      }
    ]);

    if (error) {
      alert("Error submitting order");
      console.log(error);
      setSubmitting(false);
      return;
    }

    setShowSuccess(true);

    // 🔥 Send to WhatsApp after saving
    setTimeout(() => {
      const message = `
Hello, I want to place an order:

Name: ${formData.name}
Phone: ${formData.phone}
Product: ${formData.product}
Quantity: ${formData.quantity}
Address: ${formData.address}
      `;

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      setFormData({
        name: "",
        phone: "",
        product: "",
        quantity: "",
        address: ""
      });

      setShowSuccess(false);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <section className="order" id="order">
      <div className="order-container">

        <div className="order-left">
          <h2>
            PLACE YOUR <span>ORDER</span>
          </h2>
          <p>
            Fill the form below and your order will be processed instantly.
          </p>
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <select
            name="product"
            required
            value={formData.product}
            onChange={handleChange}
            disabled={!!selectedProduct}
          >
            <option value="">
              {loadingProducts ? "Loading products..." : "Select Product"}
            </option>

            {products.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            required
            min="1"
            value={formData.quantity}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            required
            value={formData.address}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? "Processing..." : "Submit Order"}
          </button>
        </form>

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-box">
              <div className="checkmark">✓</div>
              <h3>Order Saved Successfully!</h3>
              <p>Redirecting to WhatsApp...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Order;
