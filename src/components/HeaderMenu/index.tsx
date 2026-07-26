import type { FC } from "react";
import styles from "./index.module.css";

export type MenuId = "car-circle" | "car-complex" | "handwritten";

export type HeaderMenuProps = {
  activeMenu: MenuId;
  onSelectMenu: (id: MenuId) => void;
};

const MENU_ITEMS: { id: MenuId; label: string }[] = [
  { id: "car-circle", label: "車 -円-" },
  { id: "car-complex", label: "車 -複雑-" },
  { id: "handwritten", label: "手書き文字" },
];

export const HeaderMenu: FC<HeaderMenuProps> = ({ activeMenu, onSelectMenu }) => {
  return (
    <header className={styles["header-menu"]}>
      <nav className={styles["nav"]}>
        {MENU_ITEMS.map((item) => {
          const isActive = activeMenu === item.id;
          const buttonClass = `${styles["button"]} ${isActive ? styles["-active"] : ""}`;

          return (
            <button
              key={item.id}
              type="button"
              className={buttonClass}
              onClick={() => onSelectMenu(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default HeaderMenu;
