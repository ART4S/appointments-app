import React from "react";
import { useSelector } from "react-redux";
import { Grid, Container, makeStyles } from "@material-ui/core";

import { ReactComponent as StarIcon } from "assets/icons/star.svg";

import Header from "common/components/Header/Header";
import ErrorPopup from "common/components/ErrorPopup/ErrorPopup";

import EventsTable from "./EventsTable/EventsTable";

import { selectError } from "./eventsSlice";

const EVENTS = "События";
const ERROR_LOAD_DATA =
  "В процессе загрузки данных произошла ошибка, пожалуйста перезагрузите страницу";

const SPACING = 2;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.breakpoints.values.md,
  },
  body: {
    marginTop: theme.spacing(SPACING),
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

export default function Events() {
  const classes = useStyles();
  const error = useSelector(selectError);

  return (
    <div className={classes.root}>
      <Header title={EVENTS} Icon={StarIcon} />

      <Container className={classes.body} maxWidth="md">
        <Grid item container direction="column" spacing={SPACING}>
          <Grid item xs>
            <EventsTable />
          </Grid>
        </Grid>
      </Container>

      {error && <ErrorPopup text={ERROR_LOAD_DATA} />}
    </div>
  );
}