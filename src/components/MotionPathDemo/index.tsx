import type { CSSProperties, FC } from "react";
import { Car } from "./Car";
import styles from "./index.module.css";

const PATH_DATA = "M 400,75 A 150,150 0 1,1 400,375 A 150,150 0 1,1 400,75 Z";

export const MotionPathDemo: FC = () => {
  return (
    <div className={styles.container}>
      <h1>CSS Motion Path Demo</h1>

      <div className={styles.canvasWrapper}>
        <svg className={styles.path} viewBox="0 0 800 450">
          <path d={PATH_DATA} fill="none" stroke="#999" strokeWidth="2" strokeDasharray="6 6" />
          <g
            className={styles.car}
            style={
              {
                offsetPath: `path('${PATH_DATA}')`,
              } as CSSProperties
            }
          >
            {/* 車の中心（60x26の半分）をパス上のアンカーに合わせる */}
            <g transform="translate(-30, -13)">
              <Car />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default MotionPathDemo;
