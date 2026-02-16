import "./FeatureNotice.css";
import { FaTruck, FaMoneyBillWave, FaExclamationCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

const FeatureNotice = () => {
  return (
    <div className="feature-notice">
      <div className="notice-item">
        <FaTruck className="icon" />
        <span>Free Delivery Nationwide 🚚</span>
      </div>

      <div className="notice-item">
        <FaMoneyBillWave className="icon" />
        <span>Pay On Delivery Available 💰</span>
      </div>

      <div className="notice-item">
        <TbTruckDelivery className="icon" />
        <span>Delivery: within 2 days</span>
      </div>

      <div className="notice-item warning">
        <FaExclamationCircle className="icon" />
        <span>Please have your money ready before delivery arrives.</span>
      </div>
    </div>
  );
};

export default FeatureNotice;
