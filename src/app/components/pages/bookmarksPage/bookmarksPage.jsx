import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getBookmarkEpisodesList,
  getEpisodesList,
  toggleEpisodesBookmarks,
} from "../../store/slices/episodeSlice";
import EpisodesList from "../../ui/episodesList";
import { Card, Col, Divider, Image, Row } from "antd";
import { Typography } from "antd";
const { Title, Text } = Typography;

const BookmarksPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const bookmarkedEpisodes = useSelector(getBookmarkEpisodesList());
  const episodes = useSelector(getEpisodesList());
  const handleToggleBookmark = (id) => {
    dispatch(toggleEpisodesBookmarks(id));
  };

  const handleOpenCard = (id) => {
    history.push(`episodes/${id}`);
  };

  if (episodes) {
    const findEpisodes = () => {
      const arr = [];
      if (bookmarkedEpisodes) {
        episodes.forEach((episode) => {
          if (bookmarkedEpisodes.includes(episode._id)) {
            arr.push(episode);
          }
        });
      }
      return arr;
    };
    const newEpisodes = findEpisodes();
    return (
      <Row>
        <Col span={1}></Col>
        <Col span={21}>
          <Title level={3}>Избранное</Title>
          <Divider />

          {newEpisodes.length > 0 ? (
            <EpisodesList
              episodes={newEpisodes}
              onOpenCard={handleOpenCard}
              onToggleBookmark={handleToggleBookmark}
            />
          ) : (
            <Card
              hoverable
              style={{
                background: "whitesmoke",
                cursor: "pointer",
                width: 240,
              }}
              // cover={<img alt="no image" src="/meetlogo.png" />}
            >
              no bookmarked episodes
              {/*<Meta title="no bookmarked episodes" />*/}
            </Card>
          )}
        </Col>
        <Col span={1}></Col>
      </Row>
    );
  }
};

export default BookmarksPage;
