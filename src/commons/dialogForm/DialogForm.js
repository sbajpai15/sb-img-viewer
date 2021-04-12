import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";

const styles = (theme) => ({
  updateUserNameDialog: {
    marginTop: "-10%",
    marginLeft: "-25%",
  },
  updatePostsDialog: {
    margin: "0 auto",
  },
  postTitleWrapper: {
    width: 500,
    height: "auto",
    alignItems: "center",
  },
  postImageWrapper: {
    padding: 15,
    width: "auto",
    height: "auto",
  },
  postImage: {
    width: 350,
    height: 420,
  },
  userNameContentStyle: {
    marginTop: -22,
  },
  actionBtnAlignment: {
    paddingLeft: 22,
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  editPostWrapper: {
    width: 750,
    height: "auto",
    paddingBottom: 60,
    overflowY: "visible",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userNameAlign: {
    paddingLeft: 20,
  },
  postInfoWrapper: {
    display: "flex",
    flexDirection: "coloumn",
  },
  hashTags: {
    display: "block",
    color: "#00376b",
  },
  commentContainer: {
    padding: "10px 10px 1px 0",
    width: "auto",
  },
  commentSection: {
    width: "auto",
    height: "auto",
  },
  newCommentsWrapper: {
    marginTop: "35%",
    padding: "10px 10px 1px 10px",
    width: "45%",
    position: "absolute",
  },
  textFieldWidth: {
    width: "80%",
  },
  likeAlignment: {
    margin: "55% 0 0 -5%",
    float: "left",
    width: "auto",
  },
  likeStyle: {
    color: "#000000",
  },
  red: {
    color: red[500],
  },
});

class DialogForm extends Component {
  render() {
    let {
      classes,
      showModal,
      selectedAction,
      selectedpostDetails,
      closeFormDialogHandler,
      userNameSubmitHandler,
    } = this.props;
    let { editModal, postModal, nameFieldEmpty } = selectedAction;
    const profile_picture = sessionStorage.getItem("profile-picture");
    let likeCount = 0;
    for (let count in selectedpostDetails["likes"]) {
      likeCount = selectedpostDetails["likes"]["count"];
    }

    return (
      <React.Fragment>
        <Dialog
          className={
            editModal ? classes.updateUserNameDialog : classes.updatePostsDialog
          }
          open={showModal}
          onClose={closeFormDialogHandler}
          aria-labelledby="form-dialog-title"
        >
          {editModal && (
            <div>
              <DialogTitle id="form-dialog-title">Edit</DialogTitle>
              <DialogContent className={classes.userNameContentStyle}>
                <FormControl required>
                  <TextField
                    margin="dense"
                    id="fullName"
                    label="Full Name *"
                    type="text"
                    fullWidth
                    onChange={(e) => this.updateNameHandler(e)}
                  />
                  <FormHelperText className={nameFieldEmpty}>
                    <span className="red">required</span>
                  </FormHelperText>
                </FormControl>
              </DialogContent>
              <DialogActions className={classes.actionBtnAlignment}>
                <Button
                  onClick={userNameSubmitHandler}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </DialogActions>
            </div>
          )}
          {postModal && (
            <div className={classes.editPostWrapper} id="user-profile-details">
              <div className={classes.postImageWrapper}>
                <img
                  src={selectedpostDetails["media_url"]}
                  className={classes.postImage}
                />
              </div>
              <div className={classes.postTitleWrapper}>
                <div className="avatarWrapper">
                  <Avatar src={profile_picture} alt="Profile picture" />
                  <h4 className={classes.userNameAlign}>
                    {selectedpostDetails["username"]}
                  </h4>
                </div>
                <Typography variant="body2" component="p">
                  {selectedpostDetails["caption"]}
                  <span className={classes.hashTags}>
                    {selectedpostDetails["hashTags"]}
                  </span>
                </Typography>
                <div className={classes.commentSection}>
                  {selectedpostDetails["comments"] &&
                    selectedpostDetails["comments"].length > 0 &&
                    selectedpostDetails["comments"].map((comment, idx) => (
                      <Typography
                        variant="body2"
                        component="p"
                        key={"comment" + idx}
                        className={classes.commentContainer}
                      >
                        <strong>{selectedpostDetails["username"]}: </strong>{" "}
                        {comment}
                      </Typography>
                    ))}
                </div>
                <DialogActions className={classes.likeAlignment}>
                  <div
                    className={selectedpostDetails["likeIcon"]}
                    onClick={(e) =>
                      this.addLikeHandler(selectedpostDetails["id"], likeCount)
                    }
                  >
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  </div>
                  <div
                    className={selectedpostDetails["likedIcon"]}
                    onClick={(e) =>
                      this.unlikeHandler(selectedpostDetails["id"], likeCount)
                    }
                  >
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon className={classes.red} />
                    </IconButton>
                  </div>
                  <Typography variant="body2" className={classes.likeStyle}>
                    {likeCount > 0 && likeCount}{" "}
                    {likeCount > 1 ? "likes" : likeCount > 0 && "like"}
                  </Typography>
                </DialogActions>
                <DialogActions className={classes.newCommentsWrapper}>
                  <TextField
                    id={`addComment_${selectedpostDetails["id"]}`}
                    placeholder="Add a comment"
                    className={classes.textFieldWidth}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) =>
                      this.onSubmitComment(e, selectedpostDetails["id"])
                    }
                  >
                    ADD
                  </Button>
                </DialogActions>
              </div>
            </div>
          )}
        </Dialog>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(DialogForm);
