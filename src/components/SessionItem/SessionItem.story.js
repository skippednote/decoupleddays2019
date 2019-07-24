import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router-dom";
import SessionItem from "./";
import { sessions } from "../../utils/fakes";
import { AuthContext } from "../../hooks/useAuth";

storiesOf("Session Item", module)
  .add("default", () => {
    const status = { error: false, id: false };
    return (
      <MemoryRouter>
        <SessionItem session={sessions[0]} status={status} />
      </MemoryRouter>
    );
  })
  .add("logged in", () => {
    const status = { error: false, id: false };
    return (
      <MemoryRouter>
        <AuthContext.Provider value={{ token: "yo" }}>
          <SessionItem
            session={sessions[0]}
            status={status}
            deleteHandler={action()}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  })
  .add("success", () => {
    const status = { error: false, id: true };
    return (
      <MemoryRouter>
        <AuthContext.Provider value={{ token: "yo" }}>
          <SessionItem
            session={sessions[0]}
            status={status}
            deleteHandler={action()}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  })
  .add("error", () => {
    const status = { error: true, id: false };
    return (
      <MemoryRouter>
        <AuthContext.Provider value={{ token: "yo" }}>
          <SessionItem
            session={sessions[0]}
            status={status}
            deleteHandler={action()}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  });
