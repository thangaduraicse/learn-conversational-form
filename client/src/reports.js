import React, { Component } from "react";

export default class Report extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      login: {
        uname: undefined,
        pass: undefined
      },
      reports: []
    };
  }

  onChange = e => {
    const {
      target: { id, value }
    } = e;
    let login = { ...this.state.login };

    login[id] = value;

    this.setState({ login });
  };

  onClick = e => {
    e.preventDefault();
    e.stopPropagation();

    const _this = this,
      { login } = this.state;

    fetch("/reports", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login)
    })
      .then(res => res.json())
      .then(reports => _this.setState({ reports }));
  };

  render() {
    const { reports } = this.state;

    if (reports.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.firstName}</td>
                <td>{report.lastName}</td>
                <td>{report.email}</td>
                <td>{report.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <div className="row-container">
        <div className="column-container">
          <form id="loginForm">
            <div className="form-group">
              <label htmlFor="uname">Username</label>
              <input
                type="text"
                className="form-control"
                id="uname"
                placeholder="Please enter the username"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pass">Password</label>
              <input
                type="text"
                className="form-control"
                id="pass"
                placeholder="Please enter the password"
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.onClick}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
