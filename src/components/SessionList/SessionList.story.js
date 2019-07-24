import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import SessionItem from "./";
import { sessions } from "../../utils/fakes";

storiesOf("Session List", module).add("default", () => {
  return (
    <MemoryRouter>
      <SessionItem sessions={sessions} />
    </MemoryRouter>
  );
});
