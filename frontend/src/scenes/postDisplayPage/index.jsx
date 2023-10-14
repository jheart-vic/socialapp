import React, { useEffect, useState } from "react";
import PostWidget from "../widgets/PostWidget";
import { useParams } from "react-router-dom";

const PostDisplay = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();

          setPost(data);
        } else {
          console.error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Error fetching post data: ", error);
      }
    };

    fetchPostData();
  }, [postId]);

  return (
    <div>
      {post ? (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId}
          name={`${post.firstName} ${post.lastName}`}
          description={post.description}
          location={post.location}
          picturePath={post.picturePath}
          userPicturePath={post.userPicturePath}
          likes={post.likes}
          comments={post.comments}
        />
      ) : (
        <div style={{display: "flex",justifyContent: "centre", alignItems: "centre" }}>

          <h2 style={{display: "flex", color: "skyblue", border: "1px solid black" }}>The finished work is Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default PostDisplay;
