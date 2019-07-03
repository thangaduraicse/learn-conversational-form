import React, { Component } from "react";
import { render } from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Registration from "./myForm";
import Reports from "./reports";
import "./style.css";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Registration} />
      <Route exact path="/report-details" component={Reports} />
    </div>
  </Router>
);

render(routing, document.getElementById("root"));
