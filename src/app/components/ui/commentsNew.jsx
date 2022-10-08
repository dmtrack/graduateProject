import { Comment, List, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getComments,
  loadCommentsList,
} from "../store/slices/commentsSlice";
import { getUsersList } from "../store/slices/userSlice";
import AddCommentFormNew from "../common/comments/addCommentFormNew";

const CommentsNew = ({ episodeId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(episodeId));
  }, [episodeId]);
  const comments = useSelector(getComments());

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: episodeId }));
  };
  // const handleRemoveComment = (id) => {
  //   dispatch(removeComment(id));
  // };
  const users = useSelector(getUsersList());

  if (comments) {
    const newData = function () {
      const allComments = comments.map((c) => {
        return {
          author: users.find((u) => {
            return u._id === c.userId;
          }),
          content: <p>{c.content}</p>,
          datetime: (
            <Tooltip
              title={moment(`${c.created_at}`)
                .subtract(1, "days")
                .format("YYYY-MM-DD HH:mm:ss")}
            >
              <span>
                {moment(`${c.created_at}`).subtract(0, "hours").fromNow()}
              </span>
            </Tooltip>
          ),
        };
      });
      return allComments;
    };

    return (
      comments && (
        <>
          <AddCommentFormNew onSubmit={handleSubmit} />
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={newData()}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.author.name}
                  avatar={item.author.image}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
        </>
      )
    );
  }
};

export default CommentsNew;
