import { TextField, Button, Box } from "@mui/material";

const CommentInput = ({ onSubmit, comment, setComment }) => {


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <Box display="flex">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Add a comment"
        value={comment}
        onChange={handleCommentChange}
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
        Comment
      </Button>
    </Box>
  );
};

export default CommentInput;