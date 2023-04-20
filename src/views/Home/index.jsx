import React, { useEffect, useState } from "react";
import service from "../../api/service";
import styles from "./index.module.scss";
import ScopeLoading from "../../components/ScopeLoading";
import { errorHandler } from "../../api/request";

export default function Home() {
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
      errorHandler(results[0].reason);
    }
    if (results[1].status === "fulfilled") {
      setUserList(results[1].value.data);
    } else {
      errorHandler(results[1].reason);
    }
    setScopeLoading(false);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <section className={`${styles["home-container"]}`}>
      <h1>Home</h1>
      <section className={`relative ${styles["success-list"]}`}>
        <ScopeLoading loading={scopeLoading} />
        {userList.length > 0 &&
          userList.map((item) => <p key={item.id}>{item.name}</p>)}
        {userInfo && <h1>{userInfo.name + " " + userInfo.age}</h1>}
      </section>
    </section>
  );
}
