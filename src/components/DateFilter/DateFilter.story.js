import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DateFilter from "./index";
import { sessions } from "../../utils/fakes";

storiesOf("Date Filter", module).add("default", () => (
  <DateFilter
    sessions={sessions}
    filter={{ date: "All" }}
    setFilter={action()}
  />
));
