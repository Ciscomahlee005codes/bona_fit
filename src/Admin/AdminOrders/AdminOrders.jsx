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
Region: ${order.region || "N/A"}
City: ${order.city || "N/A"}
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

      <div className="orders-wrapper">
  <table className="orders-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Product</th>
        <th>Qty</th>
        <th>Region</th>
        <th>City</th>
        <th>Address</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredOrders.map((order) => (
        <tr key={order.id}>
          <td>{order.name || "Guest"}</td>
          <td>{order.phone || "N/A"}</td>
          <td>{order.product || "N/A"}</td>
          <td>{order.quantity || 1}</td>
          <td>{order.region || "N/A"}</td>
          <td>{order.city || "N/A"}</td>
          <td>{order.address || "N/A"}</td>
          <td>
            {order.created_at
              ? new Date(order.created_at).toLocaleDateString()
              : "N/A"}
          </td>
          <td>
            <button
              className="whatsapp-btn"
              onClick={() => handleWhatsApp(order)}
            >
              <FaWhatsapp /> Contact
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="mobile-orders">
  {filteredOrders.map((order) => (
    <div key={order.id} className="mobile-card">
      <h3><b style={{fontSize: '16px'}}>Product Name: </b>{order.product}</h3>
      <p><b>Name:</b> {order.name}</p>
      <p><b>Phone:</b> {order.phone}</p>
      <p><b>Region:</b> {order.region}</p>
      <p><b>City:</b> {order.city}</p>
      <p><b>Address:</b> {order.address}</p>
      <button  className="whatsapp-btn" onClick={() => handleWhatsApp(order)}>
        <FaWhatsapp /> Contact
      </button>
    </div>
  ))}
</div>

</div>

    </div>
  );
};

export default AdminOrders;
