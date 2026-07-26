import type { CSSProperties, FC } from "react";
import { Car } from "../Car";
import styles from "./index.module.css";

const PATH_DATA =
  "M 120 120 C 300 40, 500 80, 680 140 C 760 220, 720 360, 600 380 C 450 390, 400 260, 300 280 C 200 300, 150 400, 80 340 C 30 260, 40 160, 120 120 Z";

export const CarComplexDemo: FC = () => {
  return (
    <div className={styles["car-complex-demo"]}>
      <h2 className={styles["title"]}>車 -複雑-</h2>
      <div className={styles["canvas"]}>
        <svg className={styles["stage"]} viewBox="0 0 800 450">
          <path d={PATH_DATA} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
          <g
            className={styles["car"]}
            style={
              {
                offsetPath: `path('${PATH_DATA}')`,
              } as CSSProperties
            }
          >
            <g transform="translate(-35, -15)">
              <Car />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CarComplexDemo;
