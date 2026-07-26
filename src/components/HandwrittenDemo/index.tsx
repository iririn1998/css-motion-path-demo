import type { CSSProperties, FC } from "react";
import styles from "./index.module.css";

const PATH_DATA =
  "M 100 240 C 120 80, 220 80, 200 240 C 240 140, 320 140, 300 240 C 340 180, 420 180, 380 240 C 440 100, 560 100, 500 280 C 520 200, 620 140, 600 240 C 640 180, 720 180, 700 240";

export const HandwrittenDemo: FC = () => {
  return (
    <div className={styles["handwritten-demo"]}>
      <h2 className={styles["title"]}>手書き文字</h2>
      <div className={styles["canvas"]}>
        <svg className={styles["stage"]} viewBox="0 0 800 450">
          <path d={PATH_DATA} fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          <g
            className={styles["pen"]}
            style={
              {
                offsetPath: `path('${PATH_DATA}')`,
              } as CSSProperties
            }
          >
            <circle cx="0" cy="0" r="6" fill="#2563eb" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HandwrittenDemo;
