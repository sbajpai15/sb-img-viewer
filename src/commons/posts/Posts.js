import React, { Component } from "react";
import { Redirect } from "react-router";
import Post from "../post/Post";
import "./Posts.css";

export default class Posts extends Component {
  onImageTransfer = (imageId) => {
    return this.props.cb(imageId);
  };
  render() {
    if (
      sessionStorage.getItem("access-token") === undefined ||
      this.props.isLoggedIn === false
    ) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    // console.log("from POST'S");
    // console.log(this.props.totalPosts);
    return (
      <>
        <div className="container">
          {(this.props.totalPosts || []).map((post, index) => (
            <>
              {/* {console.log("is from before POST")} */}
              {/* {console.log(post)} */}
              {/* <>
                <div>{JSON.stringify(post.caption)}</div>
                <br/>
              </> */}
              <Post
                post={post}
                cb={this.props.cb}
                count={index}
                containerId={"post#" + index}
              />
            </>
          ))}
        </div>
      </>
    );
  }
}
