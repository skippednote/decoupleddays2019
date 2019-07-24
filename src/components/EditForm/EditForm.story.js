import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import EditForm from "./index";
import {
  sessions,
  categories,
  users,
  createSessionDefault,
  createSessionSuccess,
  createSessionError
} from "../../utils/fakes";

storiesOf("Edit Form", module)
  .add("default", () => (
    <EditForm
      categories={categories}
      users={users}
      status={createSessionDefault}
      submitHandler={action()}
    />
  ))
  .add("success", () => (
    <EditForm
      categories={categories}
      users={users}
      status={createSessionSuccess}
      submitHandler={action()}
    />
  ))
  .add("error", () => (
    <EditForm
      categories={categories}
      users={users}
      status={createSessionError}
      submitHandler={action()}
    />
  ))
  .add("with values", () => (
    <EditForm
      categories={categories}
      users={users}
      status={createSessionError}
      submitHandler={action()}
      session={sessions[3]}
    />
  ));
