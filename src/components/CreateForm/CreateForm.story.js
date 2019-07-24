import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CreateForm from "./index";
import {
  categories,
  users,
  createSessionDefault,
  createSessionSuccess,
  createSessionError
} from "../../utils/fakes";

storiesOf("Create Form", module)
  .add("default", () => (
    <CreateForm
      categories={categories}
      users={users}
      status={createSessionDefault}
      submitHandler={action()}
    />
  ))
  .add("success", () => (
    <CreateForm
      categories={categories}
      users={users}
      status={createSessionSuccess}
      submitHandler={action()}
    />
  ))
  .add("error", () => (
    <CreateForm
      categories={categories}
      users={users}
      status={createSessionError}
      submitHandler={action()}
    />
  ));
