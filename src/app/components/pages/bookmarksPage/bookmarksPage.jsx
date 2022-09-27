import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getBookmarkEpisodesList,
  getEpisodesList,
  toggleEpisodesBookmarks,
} from "../../store/slices/episodeSlice";
import { getIsLoggedIn } from "../../store/slices/userSlice";
import EpisodesList from "../../ui/episodesList";
import { Card, Divider, Image } from "antd";
import Meta from "antd/es/card/Meta";

const BookmarksPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsLoggedIn());
  const history = useHistory();
  const bookmarkedEpisodes = useSelector(getBookmarkEpisodesList());
  const episodes = useSelector(getEpisodesList());
  console.log(episodes, "episodes");

  const handleOpenCard = (id) => {
    history.push(`/${id}`);
  };
  const handleToggleBookmark = (id) => {
    if (isAuth) {
      dispatch(toggleEpisodesBookmarks(id));
    } else {
      history.push("/login");
    }
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
      <div className="d-flex justify-content-center flex-wrap mb-5">
        <h2 style={{ marginBottom: "10px" }}>Избранное</h2>
        <Divider />
        {newEpisodes.length > 0 ? (
          newEpisodes.map((episode) => (
            <div
              key={episode._id}
              className="container-fluid my-3"
              style={{
                maxWidth: "350px",
              }}
            >
              <EpisodesList
                episodes={newEpisodes}
                onOpenCard={handleOpenCard}
              />
            </div>
          ))
        ) : (
          <Card
            hoverable
            style={{
              background: "whitesmoke",
              cursor: "pointer",
              width: 240,
            }}
            cover={<img alt="no image" src="/meetlogo.png" />}
          >
            <Meta title="no bookmarked episodes" />
          </Card>
        )}
      </div>
    );
  }
};

// <Image src={currentUser.image} style={{ width: 40 }} />

export default BookmarksPage;
