import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <p>
        <Link to="/not-abort-request">Not Abort Request</Link>
      </p>
      <p>
        <Link to="/abort-request">Abort Request</Link>
      </p>
    </>
  );
}
