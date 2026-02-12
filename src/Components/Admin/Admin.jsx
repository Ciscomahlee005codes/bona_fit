import { useState } from "react";
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 Handle Image Upload + Preview
 const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  console.log("Uploading file:", file);

  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (error) {
    console.error("UPLOAD ERROR:", error);
    alert(error.message);
    return;
  }

  console.log("Upload success:", data);

  const { data: publicData } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  const publicUrl = publicData.publicUrl;

  console.log("Public URL:", publicUrl);

  setFormData((prev) => ({
    ...prev,
    image: publicUrl
  }));

  setImagePreview(publicUrl);
};

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const slug = generateSlug(formData.name);

    // 🔥 Check if slug exists
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      setMessage("❌ Product with this name already exists");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description,
        image: formData.image,
        slug,
        created_at: new Date()
      }
    ]);

    if (error) {
  console.error("SUPABASE ERROR:", error);
  setMessage(`❌ ${error.message}`);
}
else {
      setMessage("✅ Product added successfully!");
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        image: ""
      });
      setImagePreview(null);
    }

    setLoading(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <button 
    className="back-btn"
    onClick={() => navigate("/")}
  >
    ← Back to Home
  </button>
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Add new products to your store</p>
        </div>

        <div className="admin-card">
          <form onSubmit={handleSubmit} className="admin-form">

            {/* Product Name */}
            <div className="form-group">
              <label>Product Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category Dropdown */}
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="form-group">
              <label>Price (GHS)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>

            {message && <p className="form-message">{message}</p>}

          </form>
        </div>

      </div>
    </div>
  );
};

export default Admin;
