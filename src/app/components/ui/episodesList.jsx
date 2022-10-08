import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, List, Row, Switch, Tooltip } from "antd";
import { toggleEpisodesBookmarks } from "../store/slices/episodeSlice";
import { useDispatch } from "react-redux";
import { getIsLoggedIn } from "../store/slices/userSlice";
import { useHistory } from "react-router-dom";

const EpisodesList = ({ episodes, onOpenCard }) => {
  const dispatch = useDispatch;
  const isAuth = useDispatch(getIsLoggedIn());
  const history = useHistory();

  const handleClick = (id) => {
    onOpenCard(id);
  };
  const handleToggleBookmark = (id) => {
    if (isAuth) {
      console.log("added to bookmarks");
      dispatch(toggleEpisodesBookmarks(id));
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
                <Tooltip title="Добавить в избранное">
                  <Switch
                    size="small"
                    onClick={() => handleToggleBookmark(item._id)}
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
    </>
  );
};

EpisodesList.propTypes = {
  episodes: PropTypes.array,
  onOpenCard: PropTypes.func,
};

export default EpisodesList;
