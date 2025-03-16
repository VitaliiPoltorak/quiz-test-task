import React, {useState, useEffect} from "react";
import {circularLoaderConfig} from "../../config";

interface CircularLoaderProps {
  animationSpeed: number // animation speed
}

const CircularLoader: React.FC<CircularLoaderProps> = ( { animationSpeed } ) => {
  const [progress, setProgress] = useState(0);
  const circumference = 2 * Math.PI * circularLoaderConfig.radius;

  useEffect(() => {
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 1;
      setProgress(progressValue);
      if ( progressValue >= 100 ) {
        clearInterval(interval);
      }
    }, animationSpeed / 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full max-w-[25.2rem] g-full max-h-[25.2rem] relative">
      <svg width="100%" height="100%" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={circularLoaderConfig.radius}
          stroke="#ccc"
          strokeWidth={circularLoaderConfig.strokeWidth}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={circularLoaderConfig.radius}
          stroke="#E4229B"
          strokeWidth={circularLoaderConfig.strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * progress) / 100}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.3s linear" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="22"
          fontWeight="bold"
          fill="white"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default CircularLoader;
