import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SessionList from ".";
import { sessions } from "../../utils/fakes";

it("renders the component", async () => {
  const { container, getByPlaceholderText, getByTestId } = render(
    <MemoryRouter>
      <SessionList sessions={sessions} />
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();
  await wait(() => {
    getByTestId("show-filters");
    fireEvent.click(getByTestId("show-filters"));
  });

  await wait(() => expect(getByPlaceholderText("Filter by title")));
  expect(container).toMatchSnapshot();
});

it("renders loading message when sessions are loading", () => {
  const { getByText } = render(
    <MemoryRouter>
      <SessionList sessions={null} />
    </MemoryRouter>
  );
  expect(getByText("Loading Sessions")).toBeInTheDocument();
});

it("renders all the sessions", () => {
  const { queryAllByTestId } = render(
    <MemoryRouter>
      <SessionList sessions={sessions} />
    </MemoryRouter>
  );
  expect(queryAllByTestId("session-item").length).toEqual(4);
});

it("renders all the expected fields", () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <SessionList sessions={sessions} />
    </MemoryRouter>
  );
  expect(getAllByTestId("session-title").length).toBeGreaterThan(0);
  expect(getAllByTestId("session-room").length).toBeGreaterThan(0);
  expect(getAllByTestId("session-date").length).toBeGreaterThan(0);
  expect(getAllByTestId("session-category").length).toBeGreaterThan(0);
  expect(getAllByTestId("session-speakers").length).toBeGreaterThan(0);
});

it("shows a message when there are no sessions created", async () => {
  const { getByText } = render(
    <MemoryRouter>
      <SessionList sessions={[]} />
    </MemoryRouter>
  );

  expect(getByText("No sessions created yet.")).toBeInTheDocument();
});

it("filters the session list on interacting with the filters", async () => {
  const { getByPlaceholderText, queryAllByTestId, getByTestId } = render(
    <MemoryRouter>
      <SessionList sessions={sessions} />
    </MemoryRouter>
  );

  fireEvent.click(getByTestId("show-filters"));

  const input = getByTestId("filter-input");
  fireEvent.change(input, {
    target: {
      value: "hello"
    }
  });
  expect(queryAllByTestId("session-item").length).toEqual(1);

  fireEvent.change(getByPlaceholderText("Filter by title"), {
    target: {
      value: ""
    }
  });

  fireEvent.click(getByTestId("category-decoupled-drupal"));
  expect(queryAllByTestId("session-item").length).toEqual(1);

  fireEvent.click(getByTestId("category-all"));
  expect(queryAllByTestId("session-item").length).toEqual(4);

  fireEvent.click(getByTestId("date-09"));
  expect(queryAllByTestId("session-item").length).toEqual(1);
});
