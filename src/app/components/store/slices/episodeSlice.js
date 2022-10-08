import { createSlice, createAction } from "@reduxjs/toolkit";
import episodesService from "../../../services/episodesService";
import localStorageService from "../../../services/localStorageService";

const initialState = {
  entities: null,
  loading: false,
  count: 0,
  amount: 0,
  error: null,
  bookmarks: localStorageService.fetchAllBookmarkedEpisodes(),
  bookmarksCount: localStorageService.fetchAllBookmarkedEpisodes().length,
};

const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    episodesRequestStarted: (state) => {
      state.isLoading = true;
    },
    episodesReceived: (state, action) => {
      state.entities = action.payload;

      state.isLoading = false;
    },
    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    episodesToggleBookmarked: (state, action) => {
      if (state.bookmarks.includes(action.payload)) {
        state.bookmarks = state.bookmarks.filter((b) => b !== action.payload);
      } else {
        state.bookmarks.push(action.payload);
      }
      state.bookmarksCount = state.bookmarks.length;
      localStorageService.setEpisodes(state.bookmarks);
    },
  },
});

const { reducer: episodesReducer, actions } = episodesSlice;

export const episodesRequested = createAction("episodes/episodesRequested");
const {
  fetching,
  fetchSuccess,
  fetchError,
  episodesRequestStarted,
  episodesReceived,
  episodesToggleBookmarked,
} = actions;

export const toggleEpisodesBookmarks = (episodeId) => (dispatch) => {
  dispatch(episodesToggleBookmarked(episodeId));
};

export const getBookmarkEpisodesList = () => (state) =>
  state.episodes.bookmarks;
export function fetchEpisodes(page, count) {
  return async function (dispatch) {
    dispatch(episodesRequestStarted);
    try {
      const { content } = await episodesService.get({
        params: { page, count },
      });
      dispatch(episodesReceived(content));
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
}
export const getEpisodesBookmarkedStatus = (episodeId) => (state) => {
  if (state.episodes.bookmarks) {
    return state.episodes.bookmarks.includes(episodeId);
  }
};

export const getEpisodesList = () => (state) => state.episodes.entities;
export const getEpisodesLoadingStatus = () => (state) => state.episodes.loading;
export const getError = () => (state) => state.episodes.error;

export default episodesReducer;
