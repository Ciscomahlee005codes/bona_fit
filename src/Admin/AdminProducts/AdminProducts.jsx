import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import "./AdminProducts.css";
import Sidebar from "../AdminSidebar/Sidebar";

const categories = [
  "Vibration Machines",
  "Strength Equipment",
  "Cardio Equipment",
  "Recovery & Wellness"
];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProducts(data);
    setLoadingProducts(false);
  };
  const openEdit = (product) => {
  console.log("Editing product:", product);

  setIsEditing(true);
  setFormOpen(true);
  setEditingProduct(product);

  setFormData({
    name: product.name || "",
    category: product.category || "",
    price: product.price || "",
    description: product.description || "",
    image: product.image || ""
  });

  setImagePreview(product.image);
};



  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("products").upload(fileName, file);
    if (error) return alert(error.message);

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    setFormData((prev) => ({ ...prev, image: data.publicUrl }));
    setImagePreview(data.publicUrl);
  };

  const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const slug = generateSlug(formData.name);

    if (isEditing) {
      // 🔥 UPDATE PRODUCT
      const { error } = await supabase
        .from("products")
        .update({
          ...formData,
          price: Number(formData.price),
          slug
        })
        .eq("id", editingProduct.id);

      if (error) throw error;

      setMessage("✅ Product updated!");
    } else {
      // 🔥 ADD NEW PRODUCT
      const { error } = await supabase.from("products").insert([{
        ...formData,
        price: Number(formData.price),
        slug,
        created_at: new Date()
      }]);

      if (error) throw error;

      setMessage("✅ Product added!");
    }

    // Refresh UI instantly
    fetchProducts();

    setFormData({ name: "", category: "", price: "", description: "", image: "" });
    setImagePreview(null);
    setEditingProduct(null);
    setIsEditing(false);
    setFormOpen(false);

  } catch (err) {
    console.log(err);
    setMessage("❌ Something went wrong");
  }

  setLoading(false);
};


 const handleDelete = async (product) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete "${product.name}"?`
  );
  if (!confirmDelete) return;

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", product.id)
    .select(); // 👈 IMPORTANT

  if (error) {
    console.log("Delete error:", error);
    alert("Delete failed");
    return;
  }

  if (!data || data.length === 0) {
    alert("❌ Delete blocked by Supabase policy (RLS)");
    return;
  }

  // remove from UI
  setProducts((prev) => prev.filter((p) => p.id !== product.id));

  alert("✅ Product deleted successfully");
};



  return (
    <div className="admin-products-page">
      <div className="dashboard-header">
        <h1>Products</h1>
        <button className="add-btn" onClick={() => setFormOpen(true)}>+ Add New Product</button>
      </div>

      {formOpen && (
        <div className="form-modal">
          <form onSubmit={handleSubmit} className="admin-form">
            <button className="close-btn" type="button" onClick={() => setFormOpen(false)}>×</button>
            <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat, i) => <option key={i}>{cat}</option>)}
            </select>
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} width="120" className="preview"/>}
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
           <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>

<button type="submit" disabled={loading}>
  {loading
    ? "Saving..."
    : isEditing
    ? "Update Product"
    : "Add Product"}
</button>

            {message && <p>{message}</p>}
          </form>
        </div>
      )}

      {loadingProducts ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {products.map((p) => (
            <div key={p.id} className="product-item">
  <div className="product-left">
    <img src={p.image} alt={p.name} />
    <div className="product-info">
      <h4>{p.name}</h4>
      <p className="price">GHS {p.price}</p>
    </div>
  </div>

  <div className="actions">

  <button
    className="edit-btn"
    onClick={() => openEdit(p)}
  >
    ✏️ Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(p)}
  >
    🗑 Delete
  </button>

</div>

</div>

          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
