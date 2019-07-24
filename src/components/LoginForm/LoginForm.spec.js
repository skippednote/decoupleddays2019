import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from ".";

it("renders the component", () => {
  const { container } = render(
    <MemoryRouter>
      <LoginForm status={{ error: false, success: false }} />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});

it("shows success message when able to login", () => {
  const { queryByTestId } = render(
    <LoginForm status={{ error: false, success: true }} />
  );
  expect(queryByTestId("status-success")).toBeTruthy();
});

it("shows error message when fields aren't populated", () => {
  const { queryByTestId } = render(
    <LoginForm status={{ error: true, success: false }} />
  );
  expect(queryByTestId("status-error")).toBeTruthy();
});
