import { createSlice } from "@reduxjs/toolkit";

const recordingsSlice = createSlice({
    name: "recordings",
    initialState: {
        recordings: [],
    },
    reducers: {
        addRecording: (state, action) => {
            state.recordings.push(action.payload);
        },
        deleteRecording: (state, action) => {
            return state.recordings = state.recordings.filter((recording) => recording.id !== action.payload);
        },
        loadRecordings: (state, action) => {
            return action.payload;
        }
    }
});

export const { addRecording, deleteRecording, loadRecordings } = recordingsSlice.actions;
export default recordingsSlice.reducer;