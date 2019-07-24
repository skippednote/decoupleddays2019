import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import TitleFilter from ".";

storiesOf("Title Filter", module).add("default", () => (
  <TitleFilter filter={""} setFilter={action()} />
));
