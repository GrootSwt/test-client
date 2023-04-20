import React from "react";
import { useParams } from "react-router-dom";

export default function Error50x() {
  const { code } = useParams();

  return <h1>{code}</h1>;
}
