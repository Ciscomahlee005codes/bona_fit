import "./About.css";
import aboutImg from "../../assets/gym-2.jpg";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-wrapper">

        <h2 className="section-title">
          ABOUT <span>BONAFIT</span>
        </h2>

        <div className="about-container">

          {/* IMAGE */}
          <div className="about-image">
            <img src={aboutImg} alt="Gym Equipment" />
          </div>

          {/* CONTENT */}
          <div className="about-content">
            <h2 className="about-heading">
              WHY CHOOSE <span>BONAFIT?</span>
            </h2>

            <p className="about-intro">
              At BonaFit, we specialize in supplying high-performance fitness
              equipment built to power serious workouts. From dumbbells and
              benches to full commercial gym machines, our products are designed
              for durability, safety, and results.
            </p>

            <p>
              Whether you're building a home gym, upgrading your fitness studio,
              or setting up a commercial training center, we provide reliable
              equipment that helps you train harder and achieve more.
            </p>

            {/* FEATURES */}
            <div className="about-features">
              <div className="feature">
                <h4>Premium Build Quality</h4>
                <p>
                  Crafted with industrial-grade materials to withstand intense,
                  long-term use.
                </p>
              </div>

              <div className="feature">
                <h4>Affordable & Competitive Pricing</h4>
                <p>
                  We provide value without compromising quality.
                </p>
              </div>

              <div className="feature">
                <h4>Fast & Reliable Delivery</h4>
                <p>
                  Quick processing and secure delivery guaranteed.
                </p>
              </div>

              <div className="feature">
                <h4>Customer Support</h4>
                <p>
                  Dedicated assistance for product selection and inquiries.
                </p>
              </div>
            </div>

            {/* STATS */}
            <div className="about-stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Happy Customers</p>
              </div>

              <div className="stat">
                <h3>150+</h3>
                <p>Products Available</p>
              </div>

              <div className="stat">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>

              <div className="stat">
                <h3>250+</h3>
                <p>Sold Products</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
