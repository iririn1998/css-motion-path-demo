import type { CSSProperties, FC } from "react";
import styles from "./index.module.css";

type CarProps = {
  className?: string;
  style?: CSSProperties;
  color?: string;
};

export const Car: FC<CarProps> = ({ className = "", style = {}, color = "#38bdf8" }) => {
  return (
    <svg
      viewBox="0 0 70 30"
      width="70"
      height="30"
      className={`${styles["car-body"]} ${className}`}
      style={{ overflow: "visible", ...style }}
    >
      <defs>
        <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <filter id="headlightGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Headlight glow trail */}
      <polygon
        points="62,18 85,10 85,26 62,20"
        fill="rgba(56, 189, 248, 0.3)"
        filter="url(#headlightGlow)"
      />

      {/* Main sports car body silhouette */}
      <path
        d="M 6,22 C 6,22 8,12 18,10 C 25,9 30,4 42,4 C 52,4 58,10 63,14 C 67,16 68,22 68,22 Z"
        fill="url(#carGradient)"
      />

      {/* Cabin Roof & Windows */}
      <path
        d="M 22,10 C 26,6 31,5 41,5 C 49,5 54,9 56,12 L 23,12 Z"
        fill="#0f172a"
        opacity="0.85"
      />

      {/* Headlight */}
      <circle cx="65" cy="17" r="2" fill="#e0f2fe" filter="url(#headlightGlow)" />
      {/* Taillight */}
      <circle cx="7" cy="18" r="2" fill="#ef4444" />

      {/* Wheels */}
      <g>
        <circle cx="18" cy="22" r="5.5" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="18" cy="22" r="2.5" fill="#cbd5e1" />
      </g>
      <g>
        <circle cx="52" cy="22" r="5.5" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="52" cy="22" r="2.5" fill="#cbd5e1" />
      </g>
    </svg>
  );
};

export default Car;
