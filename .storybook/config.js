import { configure } from "@storybook/react";
import '../src/App.css'

const req = require.context("../src/", true, /story\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
