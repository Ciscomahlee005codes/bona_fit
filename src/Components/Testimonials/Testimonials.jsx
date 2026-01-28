import { useState, useEffect } from "react";
import "./Testimonials.css";

const testimonialsData = [
  {
    id: 1,
    name: "Michael A.",
    role: "Gym Owner",
    text: "The equipment quality is top-notch. My gym members love the new machines. Delivery was fast and professional!",
  },
  {
    id: 2,
    name: "Sarah K.",
    role: "Fitness Coach",
    text: "I ordered adjustable dumbbells and they exceeded expectations. Very durable and stylish.",
  },
  {
    id: 3,
    name: "David T.",
    role: "Home Gym Enthusiast",
    text: "Perfect setup for my home gym. Great customer service and smooth ordering process.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonialsData.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent(current === testimonialsData.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonialsData.length - 1 : current - 1);
  };

  return (
    <section className="testimonials" id="testimonials">
      <h2>What Our Customers Say</h2>

      <div className="testimonial-container">
        <button className="nav-btn left" onClick={prevSlide}>
          ❮
        </button>

        <div className="testimonial-card">
          <p className="testimonial-text">
            "{testimonialsData[current].text}"
          </p>

          <div className="stars">★★★★★</div>

          <h4>{testimonialsData[current].name}</h4>
          <span>{testimonialsData[current].role}</span>
        </div>

        <button className="nav-btn right" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
