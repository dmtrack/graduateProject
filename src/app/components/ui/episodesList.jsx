import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, List, Row, Switch, Tooltip } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import {
  getBookmarkEpisodesList,
  getEpisodesBookmarkedStatus,
} from "../store/slices/episodeSlice";
import { useSelector } from "react-redux";
import { fetchAllBookmarkedEpisodes } from "../../services/localStorageService";

const EpisodesList = ({ episodes, onOpenCard, onToggleBookmark }) => {
  const history = useHistory();
  const location = useLocation();
  const bookMarkedEpisodes = useSelector(getBookmarkEpisodesList());

  const handleClick = (id) => {
    onOpenCard(id);
  };

  return (
    <>
      {location.pathname === "/episodes" ? (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={episodes}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ background: "whitesmoke", cursor: "pointer" }}
                title={`${item.date} / ${item.name}`}

                // cover={<img alt="no image" src="/meetlogo.png" />}
              >
                {item.brief}
                <br />
                <Row
                  type="flex"
                  align="right"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    size="small"
                    type="dashed"
                    onClick={() => handleClick(item._id)}
                  >
                    Посмотреть
                  </Button>
                  {bookMarkedEpisodes.includes(item._id) ? (
                    <Tooltip title="Удалить из избранного">
                      <Switch
                        checked={true}
                        size="small"
                        onClick={() => onToggleBookmark(item._id)}
                        style={{
                          alignSelf: "center",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Добавить в избранное">
                      <Switch
                        checked={false}
                        size="small"
                        onClick={() => onToggleBookmark(item._id)}
                        style={{
                          alignSelf: "center",
                        }}
                      />
                    </Tooltip>
                  )}
                </Row>
              </Card>
            </List.Item>
          )}
        ></List>
      ) : (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={episodes}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ background: "whitesmoke", cursor: "pointer" }}
                title={`${item.date} / ${item.name}`}

                // cover={<img alt="no image" src="/meetlogo.png" />}
              >
                {item.brief}
                <br />
                <Row
                  type="flex"
                  align="right"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    size="small"
                    type="dashed"
                    onClick={() => handleClick(item._id)}
                  >
                    Посмотреть
                  </Button>
                  <Tooltip title="Удалить из избранного">
                    <Switch
                      checked={true}
                      size="small"
                      onClick={() => onToggleBookmark(item._id)}
                      style={{
                        alignSelf: "center",
                      }}
                    />
                  </Tooltip>
                </Row>
              </Card>
            </List.Item>
          )}
        ></List>
      )}
    </>
  );
};

EpisodesList.propTypes = {
  episodes: PropTypes.array,
  onOpenCard: PropTypes.func,
};

export default EpisodesList;
