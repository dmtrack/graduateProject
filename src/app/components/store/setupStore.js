import { combineReducers, configureStore } from "@reduxjs/toolkit";
import episodesReducer from "./slices/episodeSlice";
import userSlice from "./slices/userSlice";
import commentsSlice from "./slices/commentsSlice";
import segmentSlice from "./slices/segmentSlice";
import citySlice from "./slices/citySlice";

const rootReducer = combineReducers({
  episodes: episodesReducer,
  users: userSlice,
  comments: commentsSlice,
  segments: segmentSlice,
  cities: citySlice
});

export function setupStore() {
  return configureStore({ reducer: rootReducer });
}
