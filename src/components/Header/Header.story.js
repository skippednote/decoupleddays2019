import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router-dom";
import Header from "./";
import { AuthContext } from "../../hooks/useAuth";

storiesOf("Header", module)
  .add("default", () => (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ))
  .add("logged in", () => (
    <MemoryRouter>
      <AuthContext.Provider value={{ token: "yo", setToken: action() }}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>
  ));
