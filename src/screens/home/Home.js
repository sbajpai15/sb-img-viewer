import React, { Component } from "react";
import "./Home.css";
import Header from "../../commons/header/Header";
import { Redirect } from "react-router";
import Posts from "../../commons/posts/Posts";
import profile_pic from "../../assets/images/profile_pic.png";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      allPosts: null,
      filterPosts: null,
      profilePic: profile_pic,
    };
  }

  componentDidMount() {
    if (!this.props.filterPosts) {
      this.fetchAllPosts();
    }
  }

  onLoginChange = (newStatus) => {
    this.setState({ isLoggedIn: newStatus }, () => {});
  };

  onFilterPosts = (updatedPosts) => {
    // console.log("######");
    // console.log(this.state.filterPosts);
    setTimeout(() => {
      this.setState({ filterPosts: updatedPosts });
    }, 500);

    // console.log("!!!!");
    // console.log(this.state.filterPosts);
  };

  fetchAllPosts = () => {
    let data = null;

    let xhr = new XMLHttpRequest();

    let that = this;

    let url = `${
      that.props.baseUrl
    }me/media?fields=id,caption&access_token=${sessionStorage.getItem(
      "access-token"
    )}`;

    xhr.open("GET", url);

    xhr.send(data);

    xhr.addEventListener("readystatechange", async function() {
      if (this.readyState === 4) {
        that.setState({
          allPosts: JSON.parse(this.responseText).data,
          filterPosts: JSON.parse(this.responseText).data,
        });
      }
    });
  };

  getImageData = (imageData) => {
    let post = {};
    let that = this;
    let imageID = imageData.id.replace(/['"]+/g, "");

    let url = `${
      that.props.baseUrl
    }${imageID}?fields=id,media_type,media_url,username,timestamp&access_token=${sessionStorage.getItem(
      "access-token"
    )}`;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4 && this.status === 200) {
        let parsedData = JSON.parse(this.responseText);

        post.id = parsedData.id;
        post.media_type = parsedData.media_type;
        post.media_url = parsedData.media_url;
        post.profilePic = that.state.profilePic;
        post.username = parsedData.username;
        post.likeIcon = "dispBlock";
        post.likedIcon = "dispNone";
        post.likesCount = Math.floor(Math.random() * 10);
        post.clear = "";
        if (imageData.caption !== undefined) {
          post.caption = imageData.caption || "This is default caption";
          post.tags = post.caption.match(/#\S+/g);
        }
        post.commentContent = [];
        post.timestamp = new Date(parsedData.timestamp);
      }
    });

    xhr.open("GET", url, true);
    xhr.send();
    return post;
  };

  render() {
    if (this.props.isLoggedIn === false) {
      return <Redirect to="/" />;
    }
    if (this.props.isLoggedIn === true) {
      return (
        <>
          <div>
            <Header
              isLoggedIn={this.props.isLoggedIn}
              allPosts={this.state.allPosts}
              showSearchBox={true}
              onIsLoggedInChanged={this.onLoginChange}
              onfilterPostsChange={this.onFilterPosts}
              {...this.props}
            />
          </div>
          <>
            <Posts
              totalPosts={this.state.filterPosts}
              {...this.props}
              cb={this.getImageData}
              key={123}
            />
          </>
        </>
      );
    }
  }
}
