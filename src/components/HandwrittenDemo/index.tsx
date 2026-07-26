import type { CSSProperties, FC } from "react";
import styles from "./index.module.css";

const PATH_DATA =
  "M 50 250 C 70 235, 95 160, 110 100 C 116 75, 96 75, 90 115 C 84 155, 87 220, 90 250 C 92 262, 102 262, 112 245 C 125 220, 142 195, 158 195 C 172 195, 175 225, 172 255 C 170 265, 180 265, 188 252 C 200 235, 218 195, 208 190 C 198 185, 186 205, 188 228 C 190 255, 208 262, 224 252 C 242 240, 270 160, 285 100 C 291 75, 271 75, 265 115 C 259 155, 262 220, 265 250 C 267 262, 277 262, 285 252 C 302 240, 330 160, 345 100 C 351 75, 331 75, 325 115 C 319 155, 322 220, 325 250 C 327 262, 337 262, 346 250 C 358 238, 375 200, 390 195 C 400 192, 388 192, 370 205 C 355 218, 355 242, 372 258 C 390 268, 415 250, 415 225 C 415 202, 395 200, 388 208 C 382 215, 410 206, 440 205";

export const HandwrittenDemo: FC = () => {
  return (
    <div className={styles["handwritten-demo"]}>
      <h2 className={styles["title"]}>手書き文字</h2>
      <div className={styles["canvas"]}>
        <svg className={styles["stage"]} viewBox="0 0 520 360">
          <path d={PATH_DATA} fill="none" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          <path
            className={styles["ink"]}
            d={PATH_DATA}
            pathLength={1}
            fill="none"
            stroke="#1e293b"
            strokeWidth="4"
            strokeLinecap="round"
          />
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
