import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withA11y } from '@storybook/addon-a11y';
import Form from "./index";
import { categories, users } from "../../utils/fakes";

addDecorator(withA11y)

storiesOf("Form", module).add("default", () => (
  <Form categories={categories} users={users} submitHandler={action()} />
));
