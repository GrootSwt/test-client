import React, { useEffect, useRef } from "react";
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
 * @param {{loading: boolean}} props
 * @returns
 */
export default function ScopeLoading({ loading }) {
  const parentElRef = useRef();
  const currentElRef = useRef();
  useEffect(() => {
    if (loading) {
      if (currentElRef.current?.parentNode) {
        parentElRef.current = currentElRef.current.parentNode;
        const position = parentElRef.current.style.position;
        if (!position || position === "static") {
          parentElRef.current.classList.add("scope-relative");
        }
        parentElRef.current.classList.add("scope-hidden");
      }
    }
    return () => {
      parentElRef.current &&
        parentElRef.current.classList.remove("scope-relative", "scope-hidden");
    };
  }, [loading]);
  return (
    loading && (
      <div
        ref={currentElRef}
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
