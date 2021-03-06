/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "services/employeeService";

export const loadUsers = createAsyncThunk(
  "appointments/filters/loadUsers",
  () => userService.getAll(),
);

const initialState = {
  client: null,
  holder: null,
  filter: {
    startDate: "",
    finishDate: "",
    status: "",
    clientId: "",
    holderId: "",
    complaints: "",
    onlyMe: false,
  },
};

const filtersSlice = createSlice({
  name: "appointments/filters",
  initialState,
  reducers: {
    setFilterValue(state, action) {
      const { name, value } = action.payload;
      state.filter[name] = value;
    },

    clearFilter(state) {
      state.filter = initialState.filter;
      state.client = null;
      state.holder = null;
    },

    setClient(state, action) {
      const client = action.payload;
      state.client = client;
      state.filter.clientId = client?.id ?? "";
    },

    setHolder(state, action) {
      const holder = action.payload;
      state.holder = holder;
      state.filter.holderId = holder?.id ?? "";
    },
  },
});

export const {
  setFilterValue,
  clearFilter,
  setClient,
  setHolder,
} = filtersSlice.actions;

const selectState = (state) => state.appointments.filters;

export const selectFilter = (state) => selectState(state).filter;

export const selectClient = (state) => selectState(state).client;

export const selectHolder = (state) => selectState(state).holder;

export default filtersSlice.reducer;
