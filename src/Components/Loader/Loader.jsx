import { useEffect, useState } from "react";
import "./Loader.css";

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinish();
          }, 600);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loader">
      <div className="loader-content">
        <h1 className="loader-logo">
          Bona<span>Fit</span>
        </h1>

        <div className="loader-bar">
          <div
            className="loader-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="loader-percent">{progress}%</p>
      </div>
    </div>
  );
};

export default Loader;
