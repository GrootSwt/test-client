import React from "react";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../components/GlobalLoading";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";

export default function Layout() {
  const globalLoading = useSelector((state) => state.global.globalLoading);
  return (
    <>
      <section className={`flex-column ${styles["layout-container"]}`}>
        <header className={`flex-none ${styles["header"]}`}></header>
        <main className={`flex-auto flex-row ${styles["main"]}`}>
          <aside className={`flex-none ${styles["aside"]}`}></aside>
          <main className={`flex-auto ${styles["content"]}`}>
            <Outlet />
          </main>
        </main>
        <footer className={`flex-none ${styles["footer"]}`}></footer>
      </section>
      {globalLoading && <GlobalLoading />}
    </>
  );
}
