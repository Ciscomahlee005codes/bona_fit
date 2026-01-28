import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">

        {/* LEFT - Google Map */}
        <div className="contact-map">
          <iframe
            title="Gym Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019889280761!2d-122.41941508468133!3d37.77492977975962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5b9c9e2f%3A0x1234567890abcdef!2sFitness%20Gym!5e0!3m2!1sen!2sus!4v0000000000000"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* RIGHT - Contact Form */}
        <div className="contact-form">
          <h2>Contact Us</h2>
          <p>Have questions? Reach out to us and we’ll get back to you quickly.</p>

          <form>
            <div className="input-group">
              <input type="text" placeholder="Your Name" required />
            </div>

            <div className="input-group">
              <input type="email" placeholder="Your Email" required />
            </div>

            <div className="input-group">
              <input type="tel" placeholder="Phone Number" />
            </div>

            <div className="input-group">
              <textarea rows="5" placeholder="Your Message" required></textarea>
            </div>

            <button type="submit" className="contact-btn">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
