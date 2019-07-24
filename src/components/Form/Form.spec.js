import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from "@testing-library/react";
import Form from ".";
import { categories, users, submitValue } from "../../utils/fakes";
import { enterFormValues } from "../../utils/form";

const submitHandlerMock = jest.fn();

it("renders the component", () => {
  const { container } = render(
    <Form
      categories={categories}
      users={users}
      submitHandler={submitHandlerMock}
    />
  );

  expect(container).toMatchSnapshot();
});

it("has all the fields present to create a new session", () => {
  const { getByLabelText } = render(
    <Form
      categories={categories}
      users={users}
      submitHandler={submitHandlerMock}
    />
  );

  getByLabelText(/title/i);
  getByLabelText(/date/i);
  getByLabelText(/time/i);
  getByLabelText(/room/i);
  getByLabelText(/length/i);
  getByLabelText(/category/i);
});

it("throws an error when I leave a required field empty", async () => {
  const { getByText, getByLabelText } = render(
    <Form
      categories={categories}
      users={users}
      submitHandler={submitHandlerMock}
    />
  );

  const title = getByLabelText("Title");
  fireEvent.blur(title);
  await wait(() => getByText("Title is required"));

  const date = getByLabelText("Date");
  fireEvent.blur(date);
  await wait(() => getByText("Date is required"));
});

it("throws an error when required fields are empty of submit", async () => {
  const { getByText, getByTestId } = render(
    <Form
      categories={categories}
      users={users}
      submitHandler={submitHandlerMock}
    />
  );

  const button = getByText("Create");
  fireEvent.click(button);
  await wait(() => expect(submitHandlerMock).not.toHaveBeenCalled());
  await waitForElement(() => getByTestId("form-error"));
});

it("doesn't throw error on submit if all values are populated", async () => {
  const { getByLabelText, getByTestId, getByText, queryByTestId } = render(
    <Form
      categories={categories}
      users={users}
      submitHandler={submitHandlerMock}
    />
  );

  enterFormValues(getByLabelText, getByTestId, fireEvent);

  fireEvent.click(getByText("Create"));
  await wait(() => {
    expect(submitHandlerMock).toHaveBeenCalled();
    expect(submitHandlerMock).toHaveBeenCalledWith(submitValue);
    expect(queryByTestId("form-error")).toBeNull();
  });
});
