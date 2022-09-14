import { Comment, List, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, loadCommentsList } from "../store/slices/commentsSlice";
import { getCurrentUserData, getIsLoggedIn } from "../store/slices/userSlice";

const CommentsNew = ({ episodeId }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(episodeId));
  }, [episodeId]);
  const comments = useSelector(getComments());

  if (comments) {
    const newData = function () {
      const allComments = comments.map((c) => {
        return {
          actions: [<span key="comment-list-reply-to-0">Reply to</span>],
          author: `${c._id}`,
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{c.content}</p>,
          datetime: (
            <Tooltip
              title={moment(`${c.created_at}`)
                .subtract(1, "days")
                .format("YYYY-MM-DD HH:mm:ss")}
            >
              <span>
                {moment(`${c.created_at}`).subtract(1, "hours").fromNow()}
              </span>
            </Tooltip>
          ),
        };
      });
      return allComments;
    };

    return (
      comments && (
        <List
          className="comment-list"
          header={`$0 replies`}
          itemLayout="horizontal"
          dataSource={newData()}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      )
    );
  }
};

export default CommentsNew;

/*
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

 */
