import type { FC } from "react";
import { useState } from "react";
import styles from "./App.module.css";
import CarCircleDemo from "./components/CarCircleDemo";
import CarComplexDemo from "./components/CarComplexDemo";
import HeaderMenu, { type MenuId } from "./components/HeaderMenu";
import HandwrittenDemo from "./components/HandwrittenDemo";

export const App: FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuId>("car-circle");

  return (
    <div className={styles["app-layout"]}>
      <HeaderMenu activeMenu={activeMenu} onSelectMenu={setActiveMenu} />

      <main className={styles["main"]}>
        {activeMenu === "car-circle" && <CarCircleDemo />}
        {activeMenu === "car-complex" && <CarComplexDemo />}
        {activeMenu === "handwritten" && <HandwrittenDemo />}
      </main>
    </div>
  );
};

export default App;
