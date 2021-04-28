import { useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { getAppointmentStatuses } from "redux/dictionaries/appointmentStatuses/selectors";
import { getFilter } from "redux/appointments/list/selectors";
import { getUsers } from "redux/users/selectors";

import * as appointmentsActions from "redux/appointments/list/actions";

import useActions from "hooks/useActions";
import useEntities from "hooks/useEntities";
import getFullName from "utils/getFullName";

const useStyle = makeStyles((theme) => ({
  form: {
    "& > *": {
      marginRight: theme.spacing(5),
    },
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "flex-start",
  },
}));

export default function AppointmentsFilter() {
  const actions = useActions(appointmentsActions);
  const classes = useStyle();
  const filter = useSelector(getFilter);
  const appointmentStatuses = useEntities(getAppointmentStatuses);
  const users = useEntities(getUsers);

  function handleFieldChange(e) {
    const field = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    actions.setFilterValue(field, value);
  }

  function handleOnSearch() {
    actions.load(filter.toJS());
  }

  return (
    <form className={classes.form} noValidate>
      <TextField
        name="startDate"
        label="С"
        type="date"
        value={filter.startDate}
        onChange={handleFieldChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        name="finishDate"
        label="По"
        type="date"
        value={filter.finishDate}
        onChange={handleFieldChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        name="clientName"
        label="Клиент"
        value={filter.clientName}
        onChange={handleFieldChange}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="onlyMe"
            checked={filter.onlyMe}
            onChange={handleFieldChange}
            color="primary"
          />
        }
        label="Только я"
      />

      <FormControl>
        <InputLabel id="statusId-label">Статус</InputLabel>

        <Select
          id="statusId-select"
          name="statusId"
          labelId="statusId-label"
          value={filter.statusId}
          onChange={handleFieldChange}
        >
          <MenuItem key={-1} value="" />

          {appointmentStatuses.map((status) => (
            <MenuItem key={status.id} value={status.id}>
              {status.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="holderId-label">Принимающий</InputLabel>

        <Select
          id="holderId-select"
          name="holderId"
          labelId="holderId-label"
          value={filter.holderId}
          onChange={handleFieldChange}
        >
          <MenuItem key={-1} value="" />

          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {getFullName(user)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        name="complaints"
        label="Жалобы"
        value={filter.complaints}
        onChange={handleFieldChange}
      />

      <IconButton color="default" onClick={handleOnSearch}>
        <SearchIcon />
      </IconButton>
    </form>
  );
}