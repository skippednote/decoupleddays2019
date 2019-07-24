import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./";
import { AuthContext } from "../../hooks/useAuth";

it("renders the component", () => {
  const { container } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});

it("renders the logout button when logged in", () => {
  const { queryByText } = render(
    <MemoryRouter>
      <AuthContext.Provider value={{ token: "yo" }}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>
  );
  expect(queryByText("Logout")).toBeTruthy();
});

it("logs out the user on clicking logout button", () => {
  const setTokenMock = jest.fn();
  const { getByText } = render(
    <MemoryRouter>
      <AuthContext.Provider value={{ token: "yo", setToken: setTokenMock }}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>
  );
  fireEvent.click(getByText("Logout"));
  expect(setTokenMock).toHaveBeenCalled();
  expect(setTokenMock).toHaveBeenCalledWith(null);
});
