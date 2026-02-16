import { useEffect, useState } from "react";
import "./DiscountCountdown.css";

const DiscountCountdown = () => {
  const getInitialTime = () => {
    const savedEndTime = localStorage.getItem("discountEndTime");

    if (savedEndTime) return new Date(savedEndTime);

    const newEndTime = new Date();
    newEndTime.setHours(newEndTime.getHours() + 24);
    localStorage.setItem("discountEndTime", newEndTime);
    return newEndTime;
  };

  const [endTime, setEndTime] = useState(getInitialTime());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(endTime) - new Date();

    if (difference <= 0) {
      const newEndTime = new Date();
      newEndTime.setHours(newEndTime.getHours() + 24);
      localStorage.setItem("discountEndTime", newEndTime);
      setEndTime(newEndTime);
      return calculateTimeLeft();
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <section className="discount">
      <div className="discount-container">

        {/* BIG BADGE */}
        <div className="discount-badge">
          🔥 40% OFF 🔥
        </div>

        <h2>
          LIMITED TIME FITNESS DEAL
        </h2>

        <div className="countdown">
          <div className="time-box">
            <h3>{timeLeft.hours}</h3>
            <p>Hours</p>
          </div>

          <div className="time-box">
            <h3>{timeLeft.minutes}</h3>
            <p>Minutes</p>
          </div>

          <div className="time-box">
            <h3>{timeLeft.seconds}</h3>
            <p>Seconds</p>
          </div>
        </div>

        <p className="discount-sub">
          Order your BonaFit equipment now before the offer ends!
        </p>
      </div>
    </section>
  );
};

export default DiscountCountdown;
