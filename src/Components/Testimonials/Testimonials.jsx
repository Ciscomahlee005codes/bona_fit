import { useState, useEffect } from "react";
import "./Testimonials.css";

// Import your WhatsApp screenshots
import shot1 from "../../assets/shot1.jpeg";
import shot2 from "../../assets/shot2.jpeg";
import shot3 from "../../assets/shot3.jpeg";
import shot4 from "../../assets/shot4.jpeg";
import shot5 from "../../assets/shot5.jpeg";
import shot6 from "../../assets/shot6.jpeg";
import shot7 from "../../assets/shot7.jpeg";

const screenshots = [
  { id: 1, image: shot1 },
  { id: 2, image: shot2 },
  { id: 3, image: shot3 },
  { id: 4, image: shot4 },
  { id: 5, image: shot5 },
  { id: 6, image: shot6 },
  { id: 7, image: shot7 }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === screenshots.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent(current === screenshots.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? screenshots.length - 1 : current - 1);
  };

  return (
    <section className="testimonials" id="testimonials">
      <h2>Our Customer Feedback</h2>

      <div className="testimonial-container">
        <button className="nav-btn left" onClick={prevSlide}>
          ❮
        </button>

        <div className="testimonial-card">
          <img
            src={screenshots[current].image}
            alt="WhatsApp Customer Feedback"
            className="testimonial-image"
          />
        </div>

        <button className="nav-btn right" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
