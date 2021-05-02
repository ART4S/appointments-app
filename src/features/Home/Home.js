/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { Link } from "react-router-dom";

import { Box, Grid, Typography, makeStyles } from "@material-ui/core";

import Header from "components/Header/Header";

import { ReactComponent as StarIcon } from "assets/icons/star.svg";
import { ReactComponent as HouseIcon } from "assets/icons/house.svg";
import { ReactComponent as ClientsIcon } from "assets/icons/clients.svg";
import { ReactComponent as MessagesIcon } from "assets/icons/messages.svg";
import { ReactComponent as BroadcastIcon } from "assets/icons/broadcast.svg";
import { ReactComponent as EmployeesIcon } from "assets/icons/employees.svg";
import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  navigationPanel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  navigationItem: {
    border: "5px solid",
    borderRadius: 10,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    width: 130,
    height: 130,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  icon: {
    fill: theme.palette.primary.main,
  },

  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
}));

function NavigationItem({ title, Icon, link }) {
  const classes = useStyles();

  return (
    <Link to={link} className={classes.link}>
      <Box className={classes.navigationItem}>
        <Icon className={classes.icon} />
        <Typography variant="h5">{title}</Typography>
      </Box>
    </Link>
  );
}

const navigationItems = [
  { title: "Приёмы", Icon: AppointmentIcon, link: "/appointments" },
  { title: "События", Icon: StarIcon, link: "/" },
  { title: "Оповещения", Icon: BroadcastIcon, link: "/" },
  { title: "Сообщения", Icon: MessagesIcon, link: "/" },
  { title: "Клиенты", Icon: ClientsIcon, link: "/" },
  { title: "Сотрудники", Icon: EmployeesIcon, link: "/" },
];

function NavigationPanel() {
  const classes = useStyles();

  return (
    <Box className={classes.navigationPanel}>
      <Grid container spacing={1} justify="center">
        {navigationItems.map((item) => (
          <Grid key={item.title} item>
            <NavigationItem {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function Home() {
  const classes = useStyles();

  return (
    <Box>
      <Header Icon={HouseIcon} title="Домашняя" />

      <Box className={classes.body}>
        <NavigationPanel />
      </Box>
    </Box>
  );
}