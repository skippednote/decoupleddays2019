import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CategoryFilter from "./index";
import { sessions } from "../../utils/fakes";

storiesOf("Category Filter", module).add("default", () => (
  <CategoryFilter
    sessions={sessions}
    filter={{ category: "All" }}
    setFilter={action()}
  />
));
