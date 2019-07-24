import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { CreateForm } from ".";
import { categories, users, submitValue } from "../../utils/fakes";
import { enterFormValues } from "../../utils/form";

it("renders the component", () => {
  const status = { error: null, id: null };
  const { container } = render(
    <CreateForm categories={categories} users={users} status={status} />
  );

  expect(container).toMatchSnapshot();
});

it("shows a success message when session is created", async () => {
  const status = { error: null, id: 3000 };
  const { queryByTestId } = render(
    <CreateForm categories={categories} users={users} status={status} />
  );
  expect(queryByTestId("status-success")).toBeTruthy();
});

it("shows an error message when session fails to be created", async () => {
  const status = { error: true, id: null };
  const { queryByTestId } = render(
    <CreateForm categories={categories} users={users} status={status} />
  );
  expect(queryByTestId("status-error")).toBeTruthy();
});

it("calls the submitHandler", async () => {
  const status = { error: null, id: null };
  const submitHandlerMock = jest.fn();
  const { getByText, getByLabelText, getByTestId } = render(
    <CreateForm
      categories={categories}
      users={users}
      status={status}
      submitHandler={submitHandlerMock}
    />
  );
  enterFormValues(getByLabelText, getByTestId, fireEvent);
  fireEvent.click(getByText("Create"));

  await wait(() => {
    expect(submitHandlerMock).toHaveBeenCalledTimes(1);
    expect(submitHandlerMock).toHaveBeenCalledWith(submitValue);
  });
});
