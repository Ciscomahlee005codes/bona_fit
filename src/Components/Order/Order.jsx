import { useState, useEffect } from "react";
import "./Order.css";

const products = [
  "Ultra Slim Vibration Plate",
  "Crosley Whole Body Vibration",
  "Vibration Plate Trainer",
  "Six-Pack Ab Machine",
  "Executive Massage Chair",
  "Multifunction Ab Crunch Bench",
  "Indoor Spinning Bike",
  "Advanced Vibration Trainer"
];

const Order = ({ selectedProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: selectedProduct || "",
    quantity: "",
    address: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Auto-fill product when coming from Product card
  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product: selectedProduct
      }));
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowSuccess(true);

    setTimeout(() => {
      const message = `
Hello, I want to place an order:

Name: ${formData.name}
Phone: ${formData.phone}
Product: ${formData.product}
Quantity: ${formData.quantity}
Address: ${formData.address}
      `;

      const whatsappNumber = "2348121269433";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(url, "_blank");

      // Reset form after sending
      setFormData({
        name: "",
        phone: "",
        product: "",
        quantity: "",
        address: ""
      });

      setShowSuccess(false);
    }, 2000);
  };

  return (
    <section className="order" id="order">
      <div className="order-container">

        <div className="order-left">
          <h2>
            PLACE YOUR <span>ORDER</span>
          </h2>
          <p>
            Ready to upgrade your fitness game? Fill out the form and
            we’ll get your equipment delivered fast and securely.
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
          >
            <option value="">Select Product</option>
            {products.map((item, index) => (
              <option key={index} value={item}>
                {item}
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

          <button type="submit">
            Submit Order
          </button>
        </form>

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-box">
              <div className="checkmark">✓</div>
              <h3>Order Submitted!</h3>
              <p>Redirecting to WhatsApp...</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Order;
