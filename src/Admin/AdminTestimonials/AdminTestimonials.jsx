import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { FaTrash, FaImage } from "react-icons/fa";
import "./AdminTestimonials.css";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    message: "",
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    setTestimonials(data || []);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleUpload = async (file) => {
    const fileName = `testimonial-${Date.now()}.jpg`;

    const { error } = await supabase.storage
      .from("testimonials")
      .upload(fileName, file);

    if (error) {
      alert("Upload failed");
      return null;
    }

    const { data } = supabase.storage
      .from("testimonials")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = null;
    if (form.image) imageUrl = await handleUpload(form.image);

    await supabase.from("testimonials").insert([
      {
        name: form.name,
        message: form.message,
        image_url: imageUrl
      }
    ]);

    setForm({ name: "", message: "", image: null });
    fetchTestimonials();
    setLoading(false);
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  return (
    <div className="admin-testimonials">

      <div className="header">
        <h1>⭐ Manage Testimonials</h1>
        <p>Add real customer feedback to increase trust & sales</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="testimonial-form">

        <div className="form-grid">
          <input
            type="text"
            placeholder="Customer Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label className="upload-box">
            <FaImage /> Upload Screenshot
            <input
              type="file"
              accept="image/*"
             onChange={(e) => {
  const file = e.target.files[0];
  setForm({ ...form, image: file });

  if (file) {
    setPreview(URL.createObjectURL(file));
  }
}}

            />
          </label>
          {preview && (
  <img src={preview} width={"50%"} className="preview-img" alt="preview" />
)}

        </div>

        <textarea
          placeholder="Customer Message"
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button type="submit" className="save-btn">
          {loading ? "Saving..." : "Add Testimonial"}
        </button>
      </form>

      {/* LIST */}
      <div className="testimonial-list">
        {testimonials.map((t) => (
          <div key={t.id} className="testimonial-card">

            {t.image_url && (
              <img src={t.image_url} alt="testimonial" />
            )}

            <div className="card-info">
              <h4>{t.name}</h4>
              <p>{t.message}</p>

              <button
                className="delete-btn"
                onClick={() => deleteTestimonial(t.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminTestimonials;
