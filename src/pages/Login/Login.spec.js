import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from ".";
import { AuthContext } from "../../hooks/useAuth";

const historyMock = { push: jest.fn() };
const setTokenMock = jest.fn();

afterEach(() => {
  setTokenMock.mockClear();
  historyMock.push.mockClear();
});

it("renders the component", async () => {
  const { container, getByPlaceholderText } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();

  await wait(() =>
    expect(getByPlaceholderText("username")).toBeInTheDocument()
  );
  expect(container).toMatchSnapshot();
});

it("redirects to home if logged in", () => {
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ setToken: setTokenMock, token: "yo" }}>
        <Login history={historyMock} />
      </AuthContext.Provider>
    </MemoryRouter>
  );
  expect(historyMock.push).toHaveBeenCalled();
  expect(historyMock.push).toHaveBeenCalledWith("/");
});

it("renders the error message when failing to log in", async () => {
  const { getByText, queryByTestId, getByPlaceholderText } = render(
    <MemoryRouter>
      <AuthContext.Provider value={{ setToken: setTokenMock }}>
        <Login history={historyMock} />
      </AuthContext.Provider>
    </MemoryRouter>
  );
  fireEvent.change(getByPlaceholderText("username"), {
    target: {
      value: "skippednote"
    }
  });
  fireEvent.change(getByPlaceholderText("password"), {
    target: {
      value: "skippednote"
    }
  });
  fireEvent.click(getByText("Login"));
  expect(setTokenMock).toBeCalledWith(
    `Basic ${btoa("skippednote:skippednote")}`
  );
  expect(queryByTestId("status-success")).toBeTruthy();
});

it("renders the success message when logged in", async () => {
  const { getByText, queryByTestId, getByPlaceholderText } = render(
    <MemoryRouter>
      <AuthContext.Provider value={{ setToken: setTokenMock }}>
        <Login history={historyMock} />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  fireEvent.click(getByText("Login"));
  expect(setTokenMock).not.toHaveBeenCalled();
  expect(queryByTestId("status-success")).toBeFalsy();
});
