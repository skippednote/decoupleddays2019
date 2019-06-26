import React from "react";
import { Link } from "@reach/router";

function Layout(props) {
  const token = window.localStorage.getItem("token");
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {token && (
          <li>
            <Link to="/sessions/create">Create a session</Link>
          </li>
        )}
      </ul>
      {props.children}
    </>
  );
}

export { Layout };
