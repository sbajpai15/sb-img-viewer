import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../../screens/login/Login";
import Profile from "../profile/Profile";

export default class Controller extends Component {
  constructor() {
    super();
    this.state = {
      baseUrl: "https://graph.instagram.com/",
      isLoggedIn: sessionStorage.getItem("access-token") ? true : false,
    };
  }

  onLoginChange = (newStatus) => {
    this.setState({ isLoggedIn: newStatus }, () => {});
  };
  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={(props) => (
            <Login
              {...props}
              baseUrl={this.state.baseUrl}
              isLoggedIn={this.state.isLoggedIn}
              onIsLoggedInChanged={this.onLoginChange}
            />
          )}
        />

        <Route
          exact
          path="/home"
          render={(props) => (
            <Home
              {...props}
              baseUrl={this.state.baseUrl}
              isLoggedIn={this.state.isLoggedIn}
              onIsLoggedInChanged={this.onLoginChange}
            />
          )}
        />

        <Route
          exact
          path="/profile"
          render={(props) => (
            <Profile
              {...props}
              baseUrl={this.state.baseUrl}
              isLoggedIn={this.state.isLoggedIn}
              onIsLoggedInChanged={this.onLoginChange}
            />
          )}
        />
      </Router>
    );
  }
}
