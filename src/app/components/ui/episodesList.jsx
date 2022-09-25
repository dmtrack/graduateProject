import React from "react";
import EpisodeCard from "../EpisodeCard";
import PropTypes from "prop-types";
import { Card, Col, List, Row } from "antd";
import episode from "../pages/episode";
import { toggleEpisodesBookmarks } from "../store/slices/episodeSlice";
import { useDispatch } from "react-redux";
import { getIsLoggedIn } from "../store/slices/userSlice";

const EpisodesList = ({ episodes, onOpenCard }) => {
  const isAuth = useDispatch(getIsLoggedIn());
  const dispatch = useDispatch;
  const handleClick = (id) => {
    onOpenCard(id);
  };
  const handleToggleBookmark = (id) => {
    if (isAuth) {
      dispatch(toggleUsersBookmarks(id));
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={episodes}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{ background: "whitesmoke", cursor: "pointer" }}
              title={`${item.date} / ${item.name}`}
              onClick={() => handleClick(item._id)}
            >
              {item.brief}
            </Card>
          </List.Item>
        )}
      ></List>
    </>
  );
};

EpisodesList.propTypes = {
  episodes: PropTypes.array,
  onOpenCard: PropTypes.func,
};

export default EpisodesList;
