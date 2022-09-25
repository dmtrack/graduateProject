import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getBookmarkEpisodesList,
  getEpisodesList,
  toggleEpisodesBookmarks,
} from "../../store/slices/episodeSlice";
import UserCard from "../../ui/userCard";
import { getIsLoggedIn } from "../../store/slices/userSlice";

const BookmarksPage = () => {
  const dispatch = useDispatch();
  const isAuth = dispatch(getIsLoggedIn());

  const history = useHistory();
  const bookmarkedEpisodes = useSelector(getBookmarkEpisodesList());
  const episodes = useSelector(getEpisodesList());
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
  const handleOpenCard = (id) => {
    history.push(`/${id}`);
  };
  const handleToggleBookmark = (id) => {
    if (isAuth) {
      dispatch(toggleEpisodesBookmarks(id));
    } else {
      history.push("/register");
    }
  };
  const newEpisodes = findEpisodes();
  return (
    <div className="d-flex justify-content-center flex-wrap mb-5">
      {newEpisodes.length > 0 ? (
        newEpisodes.map((episode) => (
          <div
            key={episode._id}
            className="container-fluid my-3"
            style={{
              maxWidth: "350px",
            }}
          >
            <UserCard
              {...episode}
              onToggleBookmark={handleToggleBookmark}
              onOpenCard={handleOpenCard}
            />
          </div>
        ))
      ) : (
        <h1 className="my-5">Please, add episodes</h1>
      )}
    </div>
  );
};

export default BookmarksPage;
