import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import Create from ".";
import { AuthContext } from "../../hooks/useAuth";
import { API as MockAPI } from "../../api";
import { enterFormValues } from "../../utils/form";

const historyMock = { push: jest.fn() };
jest.mock("../../api.js");

afterEach(() => {
  MockAPI.getCategories.mockClear();
  historyMock.push.mockClear();
});

it("renders the component", async () => {
  const { container, getByText } = render(<Create history={historyMock} />);

  expect(container).toMatchSnapshot();

  await wait(() => expect(getByText("Title")).toBeInTheDocument());
  expect(container).toMatchSnapshot();
});

it("redirects to login if token isn't found", async () => {
  render(
    <AuthContext.Provider value={{ token: null }}>
      <Create history={historyMock} />
    </AuthContext.Provider>
  );

  expect(historyMock.push).toHaveBeenCalled();
  expect(historyMock.push).toHaveBeenCalledWith("/login");
});

it("calls the api", async () => {
  const { getByText } = render(<Create history={historyMock} />);
  await wait(() => expect(getByText("Title")).toBeInTheDocument());
  expect(MockAPI.getCategories).toHaveBeenCalledTimes(1);
  expect(MockAPI.getUsers).toHaveBeenCalled();
});

it("routes to the session pages once it's created", async () => {
  const { getByText, getByLabelText, getByTestId } = render(
    <AuthContext.Provider value={{ token: "hello" }}>
      <Create history={historyMock} />
    </AuthContext.Provider>
  );
  await wait(() => expect(getByText("Title")).toBeInTheDocument());
  enterFormValues(getByLabelText, getByTestId, fireEvent);
  fireEvent.click(getByText("Create"));
  await wait(() => expect(getByLabelText("Title")).toBeInTheDocument());
  expect(MockAPI.createSession).toHaveBeenCalledTimes(1);
  expect(historyMock.push).toHaveBeenCalledTimes(1);
  expect(historyMock.push).toHaveBeenCalledWith("/3000");
});

it("stays on the same page is it fails to update the session", async () => {
  MockAPI.createSession.mockReset();
  MockAPI.createSession.mockImplementationOnce(() => ({
    error: true,
    id: false
  }));

  const { getByText, getByLabelText, getByTestId } = render(
    <AuthContext.Provider value={{ token: "hello" }}>
      <Create history={historyMock} />
    </AuthContext.Provider>
  );
  await wait(() => expect(getByText("Title")).toBeInTheDocument());
  enterFormValues(getByLabelText, getByTestId, fireEvent);
  fireEvent.click(getByText("Create"));
  await wait(() => expect(getByLabelText("Title")).toBeInTheDocument());
  expect(MockAPI.createSession).toHaveBeenCalledTimes(1);
  expect(historyMock.push).not.toHaveBeenCalled();
});

it("renders the loading message while waiting for API response", async () => {
  MockAPI.getCategories.mockReset();
  jest.mock("../../api.js", () => ({
    getCategories: jest.fn(async () => {
      return await new Promise(res => setTimeout(res, 100));
    })
  }));
  const { getByTestId } = render(<Create history={historyMock} />);
  expect(getByTestId("loading-data")).toBeInTheDocument();
});
