import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import PropTypes from "prop-types";

const Loading = (
  <LoadingOutlined
    style={{
      fontSize: 48,
    }}
  />
);
/**
 * 局部区域loading效果，父元素样式需要设置position: relative
 * @param {{loading: boolean}} props
 * @returns
 */
export default function ScopeLoading({ loading }) {
  return (
    loading && (
      <div
        className={`flex-row flex-center ${styles["scope-loading-container"]}`}
      >
        <Spin indicator={Loading}></Spin>
      </div>
    )
  );
}

ScopeLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
