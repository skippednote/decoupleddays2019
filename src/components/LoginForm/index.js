import React from "react";
import { FiLogIn } from "react-icons/fi";

function LoginForm({ submitHandler, status }) {
  return (
    <>
      {status.error && (
        <div data-testid="status-error">
          Both username and password are required.
        </div>
      )}
      {status.success && <div data-testid="status-success">Success!</div>}

      <form onSubmit={submitHandler}>
        <div className="form-item">
          <input type="text" placeholder="username" name="username" />
        </div>
        <div className="form-item">
          <input type="password" placeholder="password" name="password" />
        </div>
        <button type="submit" className="button">
          <FiLogIn /> &nbsp;&nbsp; Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
