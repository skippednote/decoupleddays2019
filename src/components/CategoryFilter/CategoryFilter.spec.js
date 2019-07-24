import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CategoryFilter from ".";
import { sessions } from "../../utils/fakes";

it("can render the component", () => {
  let filter = { category: "All" };
  const setFilterMock = jest.fn();

  const { container } = render(
    <CategoryFilter
      sessions={sessions}
      filter={filter}
      setFilter={setFilterMock}
    />
  );

  expect(container).toMatchSnapshot();
});

it("can update the filter on click", () => {
  let filter = { category: "All" };
  const setFilterMock = jest.fn();

  const { getByText } = render(
    <CategoryFilter
      sessions={sessions}
      filter={filter}
      setFilter={setFilterMock}
    />
  );

  fireEvent.click(getByText(/decoupled drupal/i));

  expect(setFilterMock).toHaveBeenCalledTimes(1);
  expect(setFilterMock).toHaveBeenCalledWith({ category: "Decoupled Drupal" });
});
