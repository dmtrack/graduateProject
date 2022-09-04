import { createSlice } from "@reduxjs/toolkit";
import segmentService from "../../../services/segment.service";

const segmentSlice = createSlice({
    name: "segments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        segmentsRequested: (state) => {
            state.isLoading = true;
        },
        segmentsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        segmentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { reducer: segmentsReducer, actions } = segmentSlice;

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadSegmentsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().segments;
    if (isOutDated(lastFetch)) {
        const { segmentsRequested, segmentsReceived, segmentsRequestFailed } =
            actions;
        dispatch(segmentsRequested());
        try {
            const { content } = await segmentService.fetchAll();
            dispatch(segmentsReceived(content));
        } catch (error) {
            dispatch(segmentsRequestFailed(error.message));
        }
    }
};
export const getSegments = () => (state) => state.segments.entities;
export const getSegmentsLoadingStatus = () => (state) =>
    state.segments.isLoading;
export const getSegmentsByIds = (segmentsIds) => (state) => {
    if (state.segments.entities) {
        const segmentsArray = [];
        for (const segId of segmentsIds) {
            for (const segment of state.segments.entities) {
                if (segment._id === segId) {
                    segmentsArray.push(segment);
                    break;
                }
            }
        }
        return segmentsArray;
    }
    return [];
};

export default segmentsReducer;
