import React, { useEffect, useState } from "react";
import service from "../api/service";
import { useDispatch } from "react-redux";
import {
  closeGlobalLoading,
  openGlobalLoading,
} from "../features/global/globalSlice";

export default function Home() {
  const [successList, setSuccessList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const getSuccessList = async () => {
    return await service.test.getSuccessList();
  };

  const getError = async () => {
    return await service.test.getError();
  };

  const init = async () => {
    try {
      dispatch(openGlobalLoading());
      const results = Promise.all([getError(), getSuccessList()]);
      console.log(results);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(closeGlobalLoading());
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <h1>Home</h1>
      {successList.length > 0 &&
        successList.map((item) => <p key={item}>{item}</p>)}
    </>
  );
}
