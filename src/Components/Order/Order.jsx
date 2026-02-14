import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import "./Order.css";

const whatsappNumber = "2347084106254"; // Admin number

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

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("name")
        .order("name");

      if (error) console.error("Fetch Products Error:", error);
      if (data) setProducts(data);

      setLoadingProducts(false);
    };
    fetchProducts();
  }, []);

  // Auto-fill selected product
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Validation
    if (!formData.product) {
      alert("Please select a product");
      setSubmitting(false);
      return;
    }

    // Insert into Supabase with created_at timestamp
    const { data, error } = await supabase.from("orders").insert([
      {
        name: formData.name,
        phone: formData.phone,
        product: formData.product,
        quantity: formData.quantity,
        address: formData.address,
        created_at: new Date() // Ensure timestamp exists
      }
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      alert("Error submitting order. Check console for details.");
      setSubmitting(false);
      return;
    }

    console.log("Order saved:", data);
    setShowSuccess(true);

    // Redirect to WhatsApp
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

    // Reset form
    setFormData({
      name: "",
      phone: "",
      product: "",
      quantity: 1,
      address: ""
    });

    setSubmitting(false);
    setShowSuccess(false);
  };

  return (
    <section className="order" id="order">
      <div className="order-container">
        <div className="order-left">
          <h2>PLACE YOUR <span>ORDER</span></h2>
          <p>Fill the form below and your order will be processed instantly.</p>
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
          />

          <button type="submit" className="submit-btn" disabled={submitting}>
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
