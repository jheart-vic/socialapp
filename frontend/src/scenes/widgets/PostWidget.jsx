import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import CommentInput from "components/comments";
import SharePopup from "components/sharedPopUp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserFirstName = useSelector((state) => state.user.firstName);
  const loggedInUserLastName = useSelector((state) => state.user.lastName);
  const loggedInUserName = `${loggedInUserFirstName} ${loggedInUserLastName}`;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [commentInput, setCommentInput] = useState("");
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);


  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleCommentSubmit = async () => {
    console.log('postId:', postId);
    console.log('comments:', comments.useId, "commentInput:", commentInput);
    const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        userName: loggedInUserName, // Include the username here
        commentText: commentInput
      }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setCommentInput("");
  };


  const openSharePopup = () => {
    setIsSharePopupOpen(true);
  };
  const closeSharePopup = () => {
    setIsSharePopupOpen(false);
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton onClick={openSharePopup}>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <SharePopup
        postUrl={`http://localhost:3001/posts/${postId}`}
        open={isSharePopupOpen}
        onClose={closeSharePopup}
      />
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                <span>{comment.userName}: </span>{comment.commentText}
              </Typography>
            </Box>
          ))}
          <Divider />
          <CommentInput
            onSubmit={handleCommentSubmit}
            comment={commentInput}
            setComment={setCommentInput}
          />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
