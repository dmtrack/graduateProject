import { createSlice } from "@reduxjs/toolkit";
import cityService from "../../../services/cityService";

const citySlice = createSlice({
    name: "cities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        cityRequested: (state) => {
            state.isLoading = true;
        },
        cityReceived: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        cityRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { reducer: cityReducer, actions } = citySlice;

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadCitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().cities;
    if (isOutDated(lastFetch)) {
        const { cityRequested, cityReceived, cityRequestFailed } =
            actions;
        dispatch(cityRequested());
        try {
            const { content} = await cityService.get();
            dispatch(cityReceived(content));
        } catch (error) {
            dispatch(cityRequestFailed(error.message));
        }
    }
};

export const getCities = () => (state) => state.cities.entities;
export const getCitiesLoadingStatus = () => (state) =>
    state.city.isLoading;

export const getCityById = (id) => (state) => {
    if (state.city.entities) {
        return state.city.entities.find((c) => c._id === id);
    }
};

export default cityReducer;
