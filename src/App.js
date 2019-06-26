import React from "react";
import { Router } from "@reach/router";
import { Layout } from "./Layout";
import { Home } from "./Home";
import { Session } from "./Session";
import { Login } from "./Login";
import { Edit } from "./Edit";
import { Create } from "./Create";
// const Edit = React.lazy(() => import("./Edit").then(m => m.Edit));

function App() {
  return (
    <Layout>
      <Router>
        <Home path="/" />
        <Session path="/sessions/:id" />
        <Edit path="/sessions/:id/edit" />
        <Create path="/sessions/create" />
        <Login path="/login" />
      </Router>
    </Layout>
  );
}
export default App;
