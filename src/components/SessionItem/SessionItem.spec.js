import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SessionItem from ".";
import { sessions } from "../../utils/fakes";
import { AuthContext } from "../../hooks/useAuth";

it("renders the component", () => {
  const status = { error: false, id: false };
  const { container } = render(
    <MemoryRouter>
      <SessionItem session={sessions[0]} status={status} />
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();
});

it("shows a success message when message is deleted", () => {
  const status = { error: null, id: true };
  const { getByTestId } = render(
    <MemoryRouter>
      <SessionItem session={sessions[0]} status={status} />
    </MemoryRouter>
  );
  expect(getByTestId("status-success")).toBeInTheDocument();
});

it("shows a error message when message is deleting fails", () => {
  const status = { error: true, id: false };
  const { getByTestId } = render(
    <MemoryRouter>
      <SessionItem session={sessions[0]} status={status} />
    </MemoryRouter>
  );
  expect(getByTestId("status-error")).toBeInTheDocument();
});

it("calls deleteHandler when button is pressed", () => {
  const status = { error: false, id: false };
  const deleteHandlerMock = jest.fn();
  const { getByText } = render(
    <MemoryRouter>
      <AuthContext.Provider value={{ token: "yo" }}>
        <SessionItem
          session={sessions[0]}
          status={status}
          deleteHandler={deleteHandlerMock}
        />
      </AuthContext.Provider>
    </MemoryRouter>
  );
  fireEvent.click(getByText("Delete this session"));
  expect(deleteHandlerMock).toHaveBeenCalledTimes(1);
});
