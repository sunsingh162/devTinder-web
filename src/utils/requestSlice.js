import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state,action) => {
        let filteredRequests = state.filter((req) => req._id !== action.payload)
        return filteredRequests
    }
  },
});

export default requestSlice.reducer;

export const { addRequests, removeRequests } = requestSlice.actions;