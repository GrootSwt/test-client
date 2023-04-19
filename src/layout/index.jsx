import React from "react";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../components/GlobalLoading";
import { useSelector } from "react-redux";

export default function Layout() {
  const globalLoading = useSelector((state) => state.global.globalLoading);
  return (
    <>
      <Outlet />
      {globalLoading && <GlobalLoading />}
    </>
  );
}
