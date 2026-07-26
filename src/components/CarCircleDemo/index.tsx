import type { CSSProperties, FC } from "react";
import { Car } from "../Car";
import styles from "./index.module.css";

const PATH_DATA = "M 400,75 A 150,150 0 1,1 400,375 A 150,150 0 1,1 400,75 Z";

export const CarCircleDemo: FC = () => {
  return (
    <div className={styles["car-circle-demo"]}>
      <h2 className={styles["title"]}>車 -円-</h2>
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

export default CarCircleDemo;
