import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Session from ".";
import { AuthContext } from "../../hooks/useAuth";
import { API as MockAPI } from "../../api";

const historyMock = { push: jest.fn() };
const matchMock = { params: { id: 3000 } };
jest.mock("../../api.js");

afterEach(() => {
  MockAPI.getSessions.mockClear();
  MockAPI.deleteSession.mockClear();
  historyMock.push.mockClear();
});

it("renders the component", async () => {
  const { container, getByTestId } = render(
    <MemoryRouter>
      <Session history={historyMock} match={matchMock} />
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();

  await wait(() => expect(getByTestId("session-item")).toBeInTheDocument());
  expect(container).toMatchSnapshot();
});

it("renders edit and delete button when logged in", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <AuthContext.Provider value={{ token: "yo" }}>
        <Session history={historyMock} match={matchMock} />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  await wait(() => {
    expect(getByText("Delete this session")).toBeInTheDocument();
    expect(getByText("Edit session")).toBeInTheDocument();
  });
});

it("calls the api", async () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Session history={historyMock} match={matchMock} />
    </MemoryRouter>
  );
  await wait(() => expect(getByTestId("session-item")).toBeInTheDocument());
  expect(MockAPI.getSessions).toHaveBeenCalledTimes(1);
});

it("redirects to homepage when session is deleted", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <AuthContext.Provider value={{ token: "hello" }}>
        <Session history={historyMock} match={matchMock} />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  await wait(() => getByText("Delete this session"));
  fireEvent.click(getByText("Delete this session"));
  expect(MockAPI.deleteSession).toHaveBeenCalledTimes(1);
  expect(MockAPI.deleteSession).toHaveBeenCalledWith(
    "017a6b73-fdcb-473f-aa49-8ae0073ab076"
  );
  await wait(() => {
    expect(historyMock.push).toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalledWith("/");
  });
});

it("stays on the same page when deleting session fails", async () => {
  MockAPI.deleteSession.mockReset();
  MockAPI.deleteSession.mockImplementationOnce(() => ({
    error: true,
    status: false
  }));

  const { getByText } = render(
    <MemoryRouter>
      <AuthContext.Provider value={{ token: "hello" }}>
        <Session history={historyMock} match={matchMock} />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  await wait(() => getByText("Delete this session"));
  fireEvent.click(getByText("Delete this session"));
  expect(MockAPI.deleteSession).toHaveBeenCalledTimes(1);
  expect(MockAPI.deleteSession).toHaveBeenCalledWith(
    "017a6b73-fdcb-473f-aa49-8ae0073ab076"
  );
  await wait(() => {
    expect(historyMock.push).not.toHaveBeenCalled();
  });
});

it("renders the loading message while waiting for API response", async () => {
  MockAPI.getSessions.mockReset();
  MockAPI.getSessions.mockImplementationOnce(() => {
    setTimeout(() => {}, 100);
  });
  const { getByTestId } = render(
    <MemoryRouter>
      <AuthContext.Provider value={{ token: "hello" }}>
        <Session history={historyMock} match={matchMock} />
      </AuthContext.Provider>
    </MemoryRouter>
  );
  expect(getByTestId("loading-data")).toBeInTheDocument();
});
