import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import LoginForm from "./";

const submitHandler = e => {
  e.preventDefault();
  action()(e);
};

storiesOf("Login Form", module)
  .add("default", () => (
    <LoginForm
      status={{ error: false, success: false }}
      submitHandler={submitHandler}
    />
  ))
  .add("success", () => (
    <LoginForm
      status={{ error: false, success: true }}
      submitHandler={submitHandler}
    />
  ))
  .add("error", () => (
    <LoginForm
      status={{ error: true, success: false }}
      submitHandler={submitHandler}
    />
  ));
