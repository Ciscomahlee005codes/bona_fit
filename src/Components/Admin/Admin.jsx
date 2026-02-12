import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const categories = [
  "Vibration Machines",
  "Strength Equipment",
  "Cardio Equipment",
  "Recovery & Wellness"
];

const Admin = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch Products
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProducts(data);

    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Check Admin
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user?.email === "youradmin@email.com") {
        setIsAdmin(true);
      } 
      // else {
      //   navigate("/");
      // }
    };

    checkAdmin();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Upload Image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setFormData((prev) => ({
      ...prev,
      image: data.publicUrl
    }));

    setImagePreview(data.publicUrl);
  };

  const generateSlug = (name) =>
    name.toLowerCase().replace(/\s+/g, "-");

  // ✅ Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const slug = generateSlug(formData.name);

    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      setMessage("❌ Product already exists");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        ...formData,
        price: Number(formData.price),
        slug,
        created_at: new Date()
      }
    ]);

    if (error) {
      setMessage("❌ Error adding product");
    } else {
      setMessage("✅ Product added successfully");
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        image: ""
      });
      setImagePreview(null);
      fetchProducts(); // 🔥 refresh list
    }

    setLoading(false);
  };

  // ✅ DELETE PRODUCT
  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `Delete ${product.name}?`
    );
    if (!confirmDelete) return;

    // delete from DB
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      alert("Error deleting product");
      return;
    }

    // delete from storage
    const filePath = product.image.split("/products/")[1];

    await supabase.storage
      .from("products")
      .remove([filePath]);

    // update UI instantly
    setProducts((prev) =>
      prev.filter((p) => p.id !== product.id)
    );

    alert("Product deleted successfully");
  };

  return (
    <div className="admin-page">
      <div className="admin-container">

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <h1>Admin Dashboard</h1>

        {/* ADD PRODUCT FORM */}
        <form onSubmit={handleSubmit} className="admin-form">

          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          {imagePreview && (
            <img src={imagePreview} width="120" />
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>

          {message && <p>{message}</p>}
        </form>

        {/* PRODUCT LIST WITH DELETE */}
        <h2>All Products</h2>

        {loadingProducts ? (
          <p>Loading...</p>
        ) : (
          <div className="admin-product-list">
            {products.map((product) => (
              <div key={product.id} className="admin-product-item">
                <img src={product.image} width="80" />
                <div>
                  <h4>{product.name}</h4>
                  <p>GHS {product.price}</p>
                </div>

                <button
  className="delete-btn"
  onClick={() => handleDelete(product)}
>
  🗑 Delete
</button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
