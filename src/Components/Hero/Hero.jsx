import { useState, useEffect } from "react";
import "./Hero.css";

import img1 from "../../assets/gym-1.jpg";
import img2 from "../../assets/gym-2.jpg";
import img3 from "../../assets/gym-3.jpg";

const slides = [img1, img2, img3];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* LEFT TEXT */}
        <div className="hero-text">
          <h1>
            BUILD YOUR <span>STRENGTH</span>
          </h1>
          <p>
            Premium gym equipment designed to power your fitness journey.
            Quality. Durability. Performance.
          </p>

          <a href="#products" className="hero-btn">
            Shop Equipment
          </a>
        </div>

        {/* CAROUSEL */}
        <div className="hero-carousel">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div className="carousel-slide" key={index}>
                <img src={slide} alt="Fitness Equipment" />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={index === current ? "dot active-dot" : "dot"}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
