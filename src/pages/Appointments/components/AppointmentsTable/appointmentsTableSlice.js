/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import appointmentService from "services/appointmentService";

const appointmentsAdapter = createEntityAdapter();

const initialState = {
  busy: false,
  error: false,
  data: appointmentsAdapter.getInitialState({}),
  pagination: {
    currentPage: 0,
    itemsPerPage: 5,
    availableItemsPerPage: [5, 15, 25],
    pageSize: 0,
    totalItems: 0,
  },
  sorting: {
    field: "",
    order: "asc",
  },
  selectedAppointmentId: null,
};

export const loadAppointments = createAsyncThunk(
  "appointments/table/loadAppointments",
  (_params, thunkApi) => {
    const state = thunkApi.getState();
    const { sorting, pagination } = state.appointments.table;
    const { filter } = state.appointments.filters;

    return appointmentService.getAll({
      ...filter,
      ...sorting,
      ...pagination,
    });
  },
);

export const deleteAppointment = createAsyncThunk(
  "appointments/table/deleteAppointment",
  (id, _thunkApi) => appointmentService.delete(id),
);

const tableSlice = createSlice({
  name: "appointments/table",
  initialState,
  reducers: {
    setSorting(state, action) {
      state.sorting = action.payload;
    },

    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },

    setItemsPerPage(state, action) {
      let itemsPerPage = action.payload;

      if (!state.pagination.availableItemsPerPage.includes(itemsPerPage)) {
        [itemsPerPage] = state.pagination.availableItemsPerPage;
      }

      state.pagination.itemsPerPage = itemsPerPage;
    },

    clearError(state) {
      state.data.error = false;
    },

    setSelectedAppointmentId(state, action) {
      state.selectedAppointmentId = action.payload;
    },

    setFirstAppointmentSelected(state) {
      const [first] = state.data.ids;
      state.selectedAppointmentId = first;
    },

    setBusy(state, action) {
      state.busy = action.payload;
    },
  },
  extraReducers: {
    [loadAppointments.pending](state) {
      state.busy = true;
      state.error = false;
    },

    [loadAppointments.fulfilled](state, action) {
      const { data, currentPage, pageSize, totalItems } = action.payload;
      state.busy = false;
      state.data = appointmentsAdapter.setAll(state.data, data);
      state.pagination.pageSize = pageSize;
      state.pagination.totalItems = totalItems;
      state.pagination.currentPage = currentPage;
    },

    [loadAppointments.rejected](state) {
      state.busy = false;
      state.error = true;
    },

    [deleteAppointment.pending](state) {
      state.busy = true;
    },

    [deleteAppointment.fulfilled](state) {
      state.busy = false;
    },

    [loadAppointments.rejected](state) {
      state.busy = false;
    },
  },
});

export const {
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  clearError,
  setSelectedAppointmentId,
  setFirstAppointmentSelected,
} = tableSlice.actions;

export const {
  selectAll: selectAllAppointments,
} = appointmentsAdapter.getSelectors((state) => state.appointments.table.data);

export const selectSorting = (state) => state.appointments.table.sorting;

export const selectPagination = (state) => state.appointments.table.pagination;

export const selectError = (state) => state.appointments.table.data.error;

export const selectAppointmentId = (state) =>
  state.appointments.table.selectedAppointmentId;

export const selectBusy = (state) => state.appointments.table.busy;

export default tableSlice.reducer;
