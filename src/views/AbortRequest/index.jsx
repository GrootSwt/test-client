import React, { useEffect, useState } from "react";
import service from "../../api/service";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  openGlobalLoadingDefaultErrorHandlerAbortRequest,
  closeGlobalLoadingDefaultErrorHandlerAbortRequest,
} from "../../store/features/commonSlice";
import { Link } from "react-router-dom";
import Button from "antd/lib/button";
import { ReloadOutlined } from "@ant-design/icons";

export default function AbortRequest() {
  const dispatch = useDispatch();
  const enableGlobalLoading = useSelector(
    (state) => state.common.enableGlobalLoading
  );

  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const getUserInfo = async () => {
    const result = await service.test.getUserInfo();
    return result;
  };
  const getUserList = async () => {
    const result = await service.test.getUserList();
    return result;
  };

  const init = async () => {
    dispatch(openGlobalLoadingDefaultErrorHandlerAbortRequest());
    try {
      const results = await Promise.all([getUserInfo(), getUserList()]);
      setUserInfo(results[0].data);
      setUserList(results[1].data);
    } catch (error) {
      // handler
    } finally {
      dispatch(closeGlobalLoadingDefaultErrorHandlerAbortRequest());
    }
  };

  function refresh() {
    init();
  }

  useEffect(() => {
    init();
    return () => {
      service.abortAllRequest();
    };
  }, []);
  return (
    <section className={`relative ${styles["home-container"]}`}>
      <p>
        <Link to="/not-abort-request">Not Abort Request</Link>
      </p>
      <Button
        onClick={refresh}
        icon={<ReloadOutlined />}
        loading={enableGlobalLoading}
        className={`${styles["refresh-btn"]}`}
      >
        refresh
      </Button>
      <section className={`margin-top-24 ${styles["user-info"]}`}>
        {userInfo && <h1>{userInfo.name + " " + userInfo.age}</h1>}
      </section>
      <section className={`relative padding-24 ${styles["user-list"]}`}>
        {userList.length > 0 &&
          userList.map((item) => (
            <ul className={`padding-12 ${styles["user-item"]}`} key={item.id}>
              <li>name: {item.name}</li>
              <li>age: {item.age}</li>
            </ul>
          ))}
      </section>
    </section>
  );
}
