import React from "react";
import { Redirect } from "react-router-dom";
import BookmarksPage from "../pages/bookmarksPage/bookmarksPage";
import localStorageService from "../../services/localStorageService";

const Bookmarks = () => {
  const isAuth = localStorageService.getUser();
  return (
    <div className="">
      {isAuth ? <BookmarksPage /> : <Redirect to={"/register"} />}
    </div>
  );
};

export default Bookmarks;
