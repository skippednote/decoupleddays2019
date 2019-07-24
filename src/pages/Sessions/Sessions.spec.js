import React from "react";
import { render, wait } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sessions from ".";
import { API as MockAPI } from "../../api";

jest.mock("../../api.js");

afterEach(() => {
  MockAPI.getSessions.mockClear();
});

it("renders the component", async () => {
  const { container, getByTestId } = render(
    <MemoryRouter>
      <Sessions />
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();

  await wait(() => expect(getByTestId("session")).toBeInTheDocument());
  expect(container).toMatchSnapshot();
});

it("renders all the sessions", async () => {
  const { queryAllByTestId } = render(
    <MemoryRouter>
      <Sessions />
    </MemoryRouter>
  );

  await wait(() => {
    expect(queryAllByTestId("session-item").length).toEqual(4);
  });
});

it("calls the api", async () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Sessions />
    </MemoryRouter>
  );
  await wait(() => expect(getByTestId("session")).toBeInTheDocument());
  expect(MockAPI.getSessions).toHaveBeenCalledTimes(1);
});

it("renders the loading message while waiting for API response", async () => {
  MockAPI.getSessions.mockReset();
  MockAPI.getSessions.mockImplementationOnce(() => {
    setTimeout(() => {}, 100);
  });
  const { getByTestId } = render(
    <MemoryRouter>
      <Sessions />
    </MemoryRouter>
  );
  expect(getByTestId("loading-data")).toBeInTheDocument();
});
