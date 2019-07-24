import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DateFilter from ".";
import { sessions } from "../../utils/fakes";

it("can render the component", () => {
  let filter = { date: "All" };
  const setFilterMock = jest.fn();

  const { container } = render(
    <DateFilter sessions={sessions} filter={filter} setFilter={setFilterMock} />
  );

  expect(container).toMatchSnapshot();
});

it("can update the filter on click", () => {
  let filter = { date: "All" };
  const setFilterMock = jest.fn();

  const { getByText } = render(
    <DateFilter sessions={sessions} filter={filter} setFilter={setFilterMock} />
  );

  fireEvent.click(getByText(/31/i));

  expect(setFilterMock).toHaveBeenCalledTimes(1);
  expect(setFilterMock).toHaveBeenCalledWith({ date: "31" });
});
