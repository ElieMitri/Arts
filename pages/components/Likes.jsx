import { useState, useEffect } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

export default function Likes() {
  const [likes, setLikes] = useState(0);
  const [clicked, setClicked] = useState(false);

  function likePost() {
    setClicked(true);
    setLikes(likes + 1);
  }

  function unlikePost() {
    setClicked(false);
    setLikes(likes - 1);
  }

  return (
    <div className="likes__wrapper">
      {clicked ? (
        <AiFillLike className="like__button" onClick={unlikePost} />
      ) : (
        <AiOutlineLike className="like__button" onClick={likePost} />
      )}
      <h1 className="number__of--likes">{likes} likes</h1>
    </div>
  );
}