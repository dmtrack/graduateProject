import { createSlice, createAction } from "@reduxjs/toolkit";
import episodesService from "../../../services/episodesService";

const initialState = {
  entities: null,
  loading: false,
  count: 0,
  amount: 0,
  error: null,
  filtered: null,
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
    filterEpisodes: (state, action) => {
      state.filtered = state.entities.filter((episode) =>
        episode.name.toLowerCase().includes(action.payload.toLowerCase()) || episode.timecodes.toLowerCase().includes(action.payload.toLowerCase()) || episode.brief.toLowerCase().includes(action.payload.toLowerCase()) || episode.date.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.filteredAmount = state.filtered.length;
    },
    removedFilterEpisodes: (state) => {
      state.filtered = null;
      state.filteredAmount = 0;
    },
  },
});

const { reducer: episodesReducer, actions } = episodesSlice;

export const episodesRequested = createAction("episodes/episodesRequested");
const {
  fetching,
  fetchSuccess,
  fetchError,
  filterEpisodes,
  removedFilterEpisodes,
    episodesRequestStarted,
    episodesReceived
} = actions;

export function fetchEpisodes(page, count) {
  return async function (dispatch) {
    dispatch(episodesRequestStarted);
    try {

      const { content } = await episodesService.get({ params: { page, count } });
      dispatch(episodesReceived(content));
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
}

export function getFilterEpisodes(text) {
  return function (dispatch) {
    dispatch(filterEpisodes(text));
  };
}

export function removeFilterEpisodes() {
  return function (dispatch) {
    dispatch(removedFilterEpisodes());
  };
}

export const getEpisodesList = () => (state) => state.episodes.entities;
export const getEpisodesLoadingStatus = () => (state) => state.episodes.loading;
export const getError = () => (state) => state.episodes.error;
export const getFilteredEpisodesList = () => (state) => state.episodes.filtered;

export default episodesReducer;
