import React from "react";
import Comments from "../ui/comments";
import { Divider } from "antd";
import CommentsNew from "../ui/commentsNew";

const Episode = ({ id, episodes }) => {
  const getEdpisodeById = (id) => {
    return episodes.find((episode) => episode._id.toString() === id);
  };
  const episode = getEdpisodeById(id);
  return (
    <>
      <div className="container-page">
        <h2>{episode ? episode.title : `Выпуск с id: ${id}  не найден`}</h2>
        <div className="card-text">
          <div className="col-sm-10">
            <h2 className="text-dark text-muted">{episode.name}</h2>{" "}
          </div>
          <Divider />
        </div>
        <div className="card-text">
          <div className="col-sm-9 mb-2 mt-2">{episode.brief}</div>
        </div>
        <div className="card-text">
          <span className="col-sm-12">{episode.timecodes}</span>
        </div>
      </div>

      <div>
        <CommentsNew episodeId={id} />
      </div>
    </>
  );
};

export default Episode;
