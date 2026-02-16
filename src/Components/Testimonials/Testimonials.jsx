import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import "./Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.log(error);
      else setTestimonials(data || []);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length)
    return (
      <section id="testimonials" className="testimonials">
        <h2>No Testimonials Yet</h2>
      </section>
    );

  return (
    <section id="testimonials" className="testimonials">
      <h2>Our Customer Feedback</h2>

      <div className="testimonial-card">
        {testimonials[current].image_url && (
          <img
            src={testimonials[current].image_url}
            alt="Customer Feedback"
          />
        )}

        <h4>{testimonials[current].name}</h4>
        <p>{testimonials[current].message}</p>
      </div>
    </section>
  );
};

export default Testimonials;
