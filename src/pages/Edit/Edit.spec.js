import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import Edit from ".";
import { AuthContext } from "../../hooks/useAuth";
import { API as MockAPI } from "../../api";
import { enterFormValues } from "../../utils/form";

const historyMock = { push: jest.fn() };
const matchMock = {
  params: {
    id: 123
  }
};
jest.mock("../../api.js");

afterEach(() => {
  MockAPI.getCategories.mockClear();
  historyMock.push.mockClear();
});

it("renders the component", async () => {
  const { container, getByText } = render(
    <Edit history={historyMock} match={matchMock} />
  );

  expect(container).toMatchSnapshot();

  await wait(() => expect(getByText("Title")).toBeInTheDocument());
  expect(container).toMatchSnapshot();
});

it("redirects to login if token isn't found", async () => {
  render(
    <AuthContext.Provider value={{ token: null }}>
      <Edit history={historyMock} match={matchMock} />
    </AuthContext.Provider>
  );

  expect(historyMock.push).toHaveBeenCalled();
  expect(historyMock.push).toHaveBeenCalledWith("/login");
});

it("calls the api", async () => {
  MockAPI.getCategories.mockClear();
  const { getByText } = render(
    <Edit history={historyMock} match={matchMock} />
  );
  await wait(() => expect(getByText("Title")).toBeInTheDocument());
  expect(MockAPI.getCategories).toHaveBeenCalledTimes(1);
  expect(MockAPI.getUsers).toHaveBeenCalled();
});

it("routes to the session pages once it's edited", async () => {
  const { getByText, getByLabelText, getByTestId } = render(
    <AuthContext.Provider value={{ token: "hello" }}>
      <Edit history={historyMock} match={matchMock} />
    </AuthContext.Provider>
  );
  await wait(() => expect(getByText("Title")).toBeInTheDocument());
  enterFormValues(getByLabelText, getByTestId, fireEvent);
  fireEvent.click(getByText("Edit"));
  await wait(() => expect(getByLabelText("Title")).toBeInTheDocument());
  expect(MockAPI.updateSession).toHaveBeenCalledTimes(1);
  expect(historyMock.push).toHaveBeenCalledTimes(1);
  expect(historyMock.push).toHaveBeenCalledWith("/3000");
});

it("stays on the same page is it fails to update the session", async () => {
  MockAPI.updateSession.mockReset();
  MockAPI.updateSession.mockImplementationOnce(() => ({
    error: true,
    id: false
  }));

  const { getByText, getByLabelText, getByTestId } = render(
    <AuthContext.Provider value={{ token: "hello" }}>
      <Edit history={historyMock} match={matchMock} />
    </AuthContext.Provider>
  );
  await wait(() => expect(getByText("Title")).toBeInTheDocument());
  enterFormValues(getByLabelText, getByTestId, fireEvent);
  fireEvent.click(getByText("Edit"));
  await wait(() => expect(getByLabelText("Title")).toBeInTheDocument());
  expect(MockAPI.updateSession).toHaveBeenCalledTimes(1);
  expect(historyMock.push).not.toHaveBeenCalled();
});

it("renders the loading message while waiting for API response", async () => {
  MockAPI.getCategories.mockReset();
  MockAPI.getCategories.mockImplementationOnce(() => {
    setTimeout(() => {}, 100);
  });
  const { getByTestId } = render(
    <Edit history={historyMock} match={matchMock} />
  );
  expect(getByTestId("loading-data")).toBeInTheDocument();
});
