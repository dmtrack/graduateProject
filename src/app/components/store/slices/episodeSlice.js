import { createSlice, createAction } from "@reduxjs/toolkit";
import episodesService from "../../../services/episodesService";

const initialState = {
  entities: null,
  loading: false,
  count: 0,
  amount: 0,
  error: null,
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

  },
});

const { reducer: episodesReducer, actions } = episodesSlice;

export const episodesRequested = createAction("episodes/episodesRequested");
const {
  fetching,
  fetchSuccess,
  fetchError,
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


export const getEpisodesList = () => (state) => state.episodes.entities;
export const getEpisodesLoadingStatus = () => (state) => state.episodes.loading;
export const getError = () => (state) => state.episodes.error;

export default episodesReducer;
