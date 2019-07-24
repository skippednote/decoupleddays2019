import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth, AuthContext } from "./hooks/useAuth";
import * as Sentry from "@sentry/browser";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

const Session = lazy(() => import("./pages/Session"));
const Login = lazy(() => import("./pages/Login"));
const Create = lazy(() => import("./pages/Create"));
const Edit = lazy(() => import("./pages/Edit"));
const Sessions = lazy(() => import("./pages/Sessions"));

Sentry.init({
  dsn: "https://fc01d226a18a4b39884193cdbcc14489@sentry.io/1498330"
});

function App() {
  const { setToken, token } = useAuth();
  return (
    <ErrorBoundary>
      <AuthContext.Provider
        value={{
          token,
          setToken
        }}
      >
        <Router>
          <Header />
          <main>
            <h1>Testing | Decoupled</h1>
            <Suspense fallback={<div>loading routes...</div>}>
              <Switch>
                <Route component={Sessions} path="/" exact />
                <Route component={Create} path="/create" />
                <Route component={Login} path="/login" />
                <Route component={Edit} path="/:id/edit" />
                <Route component={Session} path="/:id" />
              </Switch>
            </Suspense>
          </main>
        </Router>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}
export default App;
