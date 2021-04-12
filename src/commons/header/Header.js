import React, { Component } from "react";
import "./Header.css";
import SearchBox from "../searchBox/SearchBox";
import ProfilePic from "../profilePic/ProfilePic";

class Header extends Component {
  onLoginChange = (newStatus) => {
    this.props.onIsLoggedInChanged(newStatus);
  };

  onFilterPosts = (updatedPosts) => {
    this.props.onfilterPostsChange(updatedPosts);
  };
  logoHandler = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <header className="app-header">
        {sessionStorage.getItem("access-token") &&
        this.props.isLoggedIn === true ? (
          <>
            <div
              className="logo"
              style={
                this.props.isProfilePage === true ? { cursor: "pointer" } : null
              }
              onClick={
                this.props.isProfilePage === true ? this.logoHandler : null
              }
            >
              <span className="header-logo-text">Image Viewer</span>
            </div>
            <div style={{ float: "right", display: "inline" }}>
              {this.props.showSearchBox && (
                <SearchBox
                  {...this.props}
                  allPosts={this.props.allPosts}
                  onfilterPostsChange={this.onFilterPosts}
                />
              )}

              <ProfilePic
                {...this.props}
                showMyAccount={this.props.showSearchBox}
                onIsLoggedInChanged={this.onLoginChange}
              />
            </div>
          </>
        ) : (
          <div className="logo">
            <span className="header-logo-text">Image Viewer</span>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
