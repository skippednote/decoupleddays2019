import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Filters from ".";
import { sessions } from "../../utils/fakes";

it("renders the component", () => {
  const { container } = render(<Filters sessions={sessions} filter={"All"} />);
  expect(container).toMatchSnapshot();
});

it("triggers events on interacting with filters", async () => {
  const setFilterMock = jest.fn();
  const filter = {
    category: "All",
    date: "All",
    input: ""
  };
  const { getByText, getByPlaceholderText, getByTestId } = render(
    <Filters sessions={sessions} filter={filter} setFilter={setFilterMock} />
  );

  fireEvent.click(getByTestId("show-filters"));
  fireEvent.click(getByText("31"));
  expect(setFilterMock).toHaveBeenCalledWith({
    ...filter,
    date: "31"
  });

  fireEvent.click(getByText("Decoupled Drupal"));
  expect(setFilterMock).toHaveBeenCalledWith({
    ...filter,
    category: "Decoupled Drupal"
  });

  fireEvent.change(getByPlaceholderText("Filter by title"), {
    target: { value: "Testing front-end" }
  });
  expect(setFilterMock).toHaveBeenCalledWith({
    ...filter,
    input: "Testing front-end"
  });
});

it("updates the filter when interacting with the fields", async () => {
  const submitMock = jest.fn();
  const { getByTestId } = render(
    <Filters
      filter={{
        input: "",
        category: "All",
        date: "All"
      }}
      sessions={sessions}
      setFilter={submitMock}
    />
  );

  fireEvent.click(getByTestId("show-filters"));

  fireEvent.change(getByTestId("filter-input"), {
    target: {
      value: "hello"
    }
  });

  expect(submitMock).toHaveBeenCalled();
  expect(submitMock).toHaveBeenCalledWith({
    category: "All",
    date: "All",
    input: "hello"
  });
});
