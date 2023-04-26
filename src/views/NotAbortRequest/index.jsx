import React, { useEffect, useState } from "react";
import service from "../../api/service";
import styles from "./index.module.scss";
import ScopeLoading from "../../components/ScopeLoading";
import { errorHandler } from "../../api/request";
import { Button, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function NotAbortRequest() {
  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [scopeLoading, setScopeLoading] = useState(false);

  const getUserInfo = async () => {
    const result = await service.test.getUserInfo();
    return result;
  };
  const getUserList = async () => {
    const result = await service.test.getUserList();
    return result;
  };

  const init = async () => {
    setScopeLoading(true);
    const results = await Promise.allSettled([getUserInfo(), getUserList()]);
    if (results[0].status === "fulfilled") {
      setUserInfo(results[0].value.data);
    } else {
      results[0].reason &&
        errorHandler(results[0].reason, (error) => {
          if (error?.response?.status === 400) {
            message.error({
              content: "custom error handler",
            });
            return true;
          }
        });
    }
    if (results[1].status === "fulfilled") {
      setUserList(results[1].value.data);
    } else {
      results[1].reason && errorHandler(results[1].reason);
    }
    setScopeLoading(false);
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
        <Link to="/abort-request">Abort Request</Link>
      </p>
      <Button
        onClick={refresh}
        icon={<ReloadOutlined />}
        loading={scopeLoading}
        className={`${styles["refresh-btn"]}`}
      >
        refresh
      </Button>
      <section className={`margin-top-24 ${styles["user-info"]}`}>
        <ScopeLoading loading={scopeLoading} />
        {userInfo && <h1>{userInfo.name + " " + userInfo.age}</h1>}
      </section>
      <section className={`padding-24 ${styles["user-list"]}`}>
        <ScopeLoading loading={scopeLoading} />
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
