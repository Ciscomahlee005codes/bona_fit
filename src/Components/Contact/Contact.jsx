import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">

        {/* LEFT - Google Map */}
        <div className="contact-map">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.72272930245!2d-0.26213332336422485!3d5.591373811872939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sng!4v1770266005781!5m2!1sen!2sng"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
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
