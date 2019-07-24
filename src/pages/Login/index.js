import React, { useState, lazy, Suspense } from "react";
import { useAuthContext } from "../../hooks/useAuth";
const LoginForm = lazy(() => import("../../components/LoginForm"));

function Login({ history }) {
  const [status, setStatus] = useState({ error: false, success: false });
  const { token, setToken } = useAuthContext();
  if (token) {
    history.push("/");
    return null;
  }

  const submitHandler = e => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    if (username.value === "" || password.value === "") {
      setStatus({
        error: true,
        success: false
      });
      return;
    }
    const token = "Basic " + btoa(`${username.value}:${password.value}`);
    setToken(token);
    setStatus({
      error: false,
      success: true
    });
    history.push("/");
  };

  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <LoginForm submitHandler={submitHandler} status={status} />
    </Suspense>
  );
}

export default Login;
