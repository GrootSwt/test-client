import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const Loading = (
  <LoadingOutlined
    style={{
      fontSize: 48,
    }}
  />
);

export default function GlobalLoading() {
  return (
    <div
      className={`flex-row flex-center fixed ${styles["global-loading-container"]}`}
    >
      <Spin indicator={Loading}></Spin>
    </div>
  );
}
