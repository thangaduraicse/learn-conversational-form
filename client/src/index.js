import React from "react";
import { render } from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Registration from "./myForm";
import Reports from "./reports";
import "./style.css";

const routing = (
  <Router>
    <Route exact path="/" component={Registration} />
    <Route exact path="/report-details" component={Reports} />
  </Router>
);

render(routing, document.getElementById("root"));
