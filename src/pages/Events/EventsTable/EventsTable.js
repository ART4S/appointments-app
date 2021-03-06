/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { debounce } from "lodash";
import { Paper, ClickAwayListener } from "@material-ui/core";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";

import Table from "common/components/Table/Table";
import TableToolBar from "common/components/TableToolbar/TableToolBar";
import BusyScreen from "common/components/BusyScreen/BusyScreen";
import useLocalization from "common/hooks/useLocalization";
import eventTypes from "model/enums/eventTypes";
import {
  loadEvents,
  markSeen,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  setSelectedEvent,
  sendSeenEvents,
  selectEvents,
  selectSorting,
  selectPagination,
  selectEvent,
  selectBusy,
  selectSeenEventIds,
} from "./eventsTableSlice";

const EVENT_TYPE_ICONS = {
  [eventTypes.news]: AnnouncementOutlinedIcon,
  [eventTypes.meeting]: PeopleAltIcon,
  [eventTypes.emergency]: NotificationImportantIcon,
};

const DATE_FORMAT = "DD.MM.YYYY";

export default function EventsTable() {
  const dispatch = useDispatch();
  const l = useLocalization();
  const busy = useSelector(selectBusy);
  const events = useSelector(selectEvents);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);
  const selectedEvent = useSelector(selectEvent);
  const seenEventIds = useSelector(selectSeenEventIds);

  const columns = [
    {
      field: "date",
      header: l("events.date"),
      enableSort: true,
      formatter: (d) => moment(d).format(DATE_FORMAT),
    },
    {
      field: "name",
      header: l("events.name"),
      enableSort: true,
    },
    {
      field: "authorName",
      header: l("events.author"),
      enableSort: true,
    },
    {
      field: "type",
      formatter: (type) => {
        const Icon = EVENT_TYPE_ICONS[type];
        return <Icon />;
      },
    },
  ];

  React.useEffect(() => {
    dispatch(loadEvents());
  }, []);

  const sendSeenEventsDebounced = React.useCallback(
    debounce(() => dispatch(sendSeenEvents()), 2000),
    [],
  );

  React.useEffect(() => {
    if (seenEventIds.length) {
      sendSeenEventsDebounced();
    }
  }, [seenEventIds]);

  function handleSortRequest(order, field) {
    dispatch(setSorting({ order, field }));
    dispatch(loadEvents());
  }

  function handleCurrentPageChange(newPage) {
    dispatch(setCurrentPage(newPage));
    dispatch(loadEvents());
  }

  function handleItemsPerPageChange(newItemsPerPage) {
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(0));
    dispatch(loadEvents());
  }

  function handleSelectedRowChange({ data: event }) {
    dispatch(setSelectedEvent(event));
    if (!event.seen) {
      dispatch(markSeen(event));
    }
  }

  function createRow(event) {
    return { key: event.id, visited: event.seen, data: event };
  }

  return (
    <ClickAwayListener onClickAway={() => dispatch(setSelectedEvent(null))}>
      <Paper>
        <BusyScreen isBusy={busy}>
          <TableToolBar isItemSelected={Boolean(selectedEvent)} />

          <Table
            columns={columns}
            rows={events.map(createRow)}
            pagination={pagination}
            sorting={sorting}
            selectedRow={selectedEvent && createRow(selectedEvent)}
            onSelectedRowChange={handleSelectedRowChange}
            onSortRequest={handleSortRequest}
            onCurrentPageChange={handleCurrentPageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </BusyScreen>
      </Paper>
    </ClickAwayListener>
  );
}
