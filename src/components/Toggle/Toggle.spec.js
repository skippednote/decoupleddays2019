import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Toggle from ".";

describe("toggle", () => {
  it("should have a toggle button", () => {
    const { getByText, container } = render(<Toggle on="Hide Filter" off="Show Filter">Hello</Toggle>);
    getByText("Show Filter");
    expect(container).toMatchSnapshot();
  });

  it("should toggle text on button click", () => {
    const { getByText, container } = render(<Toggle on="Hide Filter" off="Show Filter">Hello</Toggle>);
    fireEvent.click(getByText("Show Filter"));
    expect(getByText("Hide Filter")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should toggle children on click", () => {
    const { queryByText, getByText } = render(<Toggle on="Hide Filter" off="Show Filter">Hello</Toggle>);
    expect(queryByText("Hello")).toBeNull();
    fireEvent.click(getByText("Show Filter"));
    expect(queryByText("Hello")).toBeInTheDocument();
  });
});
