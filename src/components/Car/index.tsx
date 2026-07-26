import type { CSSProperties, FC } from "react";

type CarProps = {
  className?: string;
  style?: CSSProperties;
};

export const Car: FC<CarProps> = ({ className = "", style = {} }) => {
  return (
    <svg
      viewBox="0 0 60 26"
      width="60"
      height="26"
      className={className}
      style={{ overflow: "visible", ...style }}
    >
      {/* Simple minimalist car silhouette */}
      <path
        d="M 5,18 C 5,18 7,10 16,9 C 22,8 26,4 36,4 C 44,4 49,9 53,12 C 57,14 58,18 58,18 Z"
        fill="#000000"
      />
      {/* Wheels */}
      <circle cx="16" cy="18" r="4.5" fill="#333333" />
      <circle cx="44" cy="18" r="4.5" fill="#333333" />
    </svg>
  );
};

export default Car;
