import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

function Login() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);
  
  const submit = e => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    setToken("Basic " + btoa(`${username.value}:${password.value}`));
    navigate("/");
  };
  return (
    <form onSubmit={submit}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}

export { Login };
