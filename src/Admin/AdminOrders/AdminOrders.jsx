import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { FaWhatsapp, FaSearch, FaSyncAlt } from "react-icons/fa";
import "./AdminOrders.css";

const whatsappNumber = "2347084106254"; // Owner's number

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🔥 Fetch all orders from Supabase
  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.log("Error fetching orders:", error);
    else setOrders(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleWhatsApp = (order) => {
    const message = `
Hello, I am contacting you regarding this order:

Name: ${order.name || "Guest"}
Phone: ${order.phone || "N/A"}
Product: ${order.product || "N/A"}
Quantity: ${order.quantity || 1}
Address: ${order.address || "N/A"}
    `;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // 🔥 Filter orders based on search input
  const filteredOrders = orders.filter(
    (order) =>
      (order.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (order.product || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading)
    return <h2 className="loading">Loading Orders...</h2>;
  if (!orders.length)
    return <h2 className="loading">No orders yet.</h2>;

  return (
    <div className="admin-orders">
      <h1>All Orders</h1>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by Name or Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="refresh-btn" onClick={fetchOrders}>
          <FaSyncAlt />
        </button>
      </div>

      <div className="orders-table">
        <div className="orders-header">
          <span>Name</span>
          <span>Phone</span>
          <span>Product</span>
          <span>Qty</span>
          <span>Address</span>
          <span>Action</span>
        </div>

        {filteredOrders.map((order) => (
          <div className="orders-row" key={order.id}>
            <span>{order.name || "Guest"}</span>
            <span>{order.phone || "N/A"}</span>
            <span>{order.product || "N/A"}</span>
            <span>{order.quantity || 1}</span>
            <span>{order.address || "N/A"}</span>
            <span>
              <button
                className="whatsapp-btn"
                onClick={() => handleWhatsApp(order)}
              >
                <FaWhatsapp className="icon" /> Contact
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
