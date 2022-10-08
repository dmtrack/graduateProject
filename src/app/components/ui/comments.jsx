import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from "../store/slices/commentsSlice";

import { getIsLoggedIn } from "../store/slices/userSlice";

const Comments = ({ episodeId }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(episodeId));
  }, [episodeId]);
  const comments = useSelector(getComments());
  const isLoading = useSelector(getCommentsLoadingStatus());
  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: episodeId }));
  };
  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
  return isLoggedIn ? (
    <>
      <div className="card mb-2 mt-3">
        {" "}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {isLoading ? (
              "Loading..."
            ) : (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            )}
          </div>
        </div>
      )}
    </>
  ) : (
    <>
      <div className="card mb-2 mt-3">
        {" "}
        <div className="card-body ">
          Для того чтобы оставить комментарий - авторизуйтесь
        </div>
      </div>
    </>
  );
};

export default Comments;
