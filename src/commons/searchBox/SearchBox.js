import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Input, InputAdornment } from "@material-ui/core";
import "./SearchBox.css";

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  onSearch = async (e) => {
    await this.setState({ searchText: e.target.value });

    if (this.state.searchText.trim() === "" || this.state.searchText === null) {
      this.setState({ filtered_post: this.props.allPosts });
      this.props.onfilterPostsChange(this.props.allPosts);
    } else {
      let that = this;
      let filteredPosts = that.props.allPosts.filter(function(post) {
        if (post.caption === undefined) {
          return false;
        }
        return post.caption
          .toUpperCase()
          .includes(that.state.searchText.toUpperCase());
      });
      // console.log("--->");
      // console.log(filteredPosts);
      this.props.onfilterPostsChange(filteredPosts);
    }
  };

  componentDidMount() {
    this.setState({ filtered_post: this.props.allPosts });
  }

  render() {
    return (
      <div className="header-right-flex-container">
        {this.props.showSearchBox ? (
          <Input
            className="search-box"
            type="search"
            placeholder="Search..."
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={this.onSearch}
          />
        ) : null}
      </div>
    );
  }
}
