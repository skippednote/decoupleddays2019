import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Filters from "./index";
import { sessions } from "../../utils/fakes";

storiesOf("Filters", module).add("default", () => (
  <Filters sessions={sessions} filter={""} setFilter={action()} />
));
