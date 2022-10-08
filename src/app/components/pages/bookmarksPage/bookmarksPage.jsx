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
      <div className="d-flex justify-content-center flex-wrap mb-5">
        <h2 style={{ marginBottom: "10px" }}>Избранное</h2>
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
      </div>
    );
  }
};

// <Image src={currentUser.image} style={{ width: 40 }} />

export default BookmarksPage;
