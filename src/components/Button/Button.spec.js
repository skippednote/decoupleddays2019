import React from "react";
import { render } from "@testing-library/react";
import Button from ".";

it("renders the button component", () => {
  const { container } = render(<Button className={"button"}>New York</Button>);

  expect(container).toMatchSnapshot();
});
