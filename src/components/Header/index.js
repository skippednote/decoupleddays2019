import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiLogIn, FiLogOut, FiFilePlus } from "react-icons/fi";
import { useAuthContext } from "../../hooks/useAuth";
import Button from "../Button";

function Header() {
  const { token, setToken } = useAuthContext();

  return (
    <header>
      <ul className="navigation">
        <li>
          <NavLink exact to="/" activeclassname="active" className="button">
            <FiHome /> <span>Home</span>
          </NavLink>
        </li>

        {token && (
          <>
            <li>
              <NavLink
                exact
                to="/create"
                activeclassname="active"
                className="button"
              >
                <FiFilePlus /> <span>Create a session</span>
              </NavLink>
            </li>
            <li>
              <Button
                className="button"
                onClick={() => setToken(null)}
                activeclassname="active"
              >
                <FiLogOut /> <span>Logout</span>
              </Button>
            </li>
          </>
        )}

        {!token && (
          <li>
            <NavLink
              exact
              to="/login"
              activeclassname="active"
              className="button"
            >
              <FiLogIn /> <span>Login</span>
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
