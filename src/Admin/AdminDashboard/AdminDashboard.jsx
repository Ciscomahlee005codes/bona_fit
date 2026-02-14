import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./AdminDashboard.css";
import { FaBoxOpen, FaClipboardList, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      // 🔹 Total Products
      const { count: productsCount, error: productError } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true });

      if (productError) console.log("Products count error:", productError);
      else setTotalProducts(productsCount || 0);

      // 🔹 Total Orders
      const { count: ordersCount, error: ordersError } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true });

      if (ordersError) console.log("Orders count error:", ordersError);
      else setTotalOrders(ordersCount || 0);

      // 🔹 Total Users (optional)
      const { count: usersCount, error: usersError } = await supabase
        .from("users")
        .select("id", { count: "exact", head: true });

      if (usersError) console.log("Users count error:", usersError);
      else setTotalUsers(usersCount || 0);

      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading)
    return <h2 style={{ color: "white", textAlign: "center" }}>Loading Dashboard...</h2>;

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard Overview</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <FaBoxOpen className="icon" />
          <div className="card-info">
            <h2>{totalProducts}</h2>
            <p>Total Products</p>
          </div>
        </div>

        <div className="dashboard-card">
          <FaClipboardList className="icon" />
          <div className="card-info">
            <h2>{totalOrders}</h2>
            <p>Total Orders</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
