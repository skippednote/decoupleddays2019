import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TitleFilter from ".";

it("can render the component", () => {
  let filter = { input: "" };
  const setFilterMock = jest.fn();

  const { container } = render(
    <TitleFilter filter={filter} setFilter={setFilterMock} />
  );

  expect(container).toMatchSnapshot();
});

it("can update the filter on click", () => {
  let filter = { input: "" };
  const setFilterMock = jest.fn();

  const { getByTestId } = render(
    <TitleFilter filter={filter} setFilter={setFilterMock} />
  );

  const input = getByTestId("filter-input");
  fireEvent.input(input, {
    target: {
      value: "Testing Front-end"
    }
  });

  expect(setFilterMock).toHaveBeenCalledTimes(1);
  expect(setFilterMock).toHaveBeenCalledWith({ input: "Testing Front-end" });
});
