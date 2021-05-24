/* eslint-disable arrow-body-style */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Grid,
  Slide,
  makeStyles,
} from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons";

const ERROR = "Ошибка";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(1, 0),
  },
  content: {
    paddingBottom: theme.spacing(2),
  },
  text: {
    fontSize: "1.2rem",
  },
  icon: {
    width: 50,
    height: 50,
    color: theme.palette.error.main,
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ErrorPopup({
  title,
  text,
  closeDelay,
  ...dialogProps
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog
      {...dialogProps}
      open={open}
      TransitionComponent={Transition}
      onEnter={() => setTimeout(() => setOpen(false), closeDelay)}
    >
      <DialogTitle>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent className={classes.content}>
        <Grid container>
          <Grid item xs={10}>
            <DialogContentText className={classes.text}>
              {text}
            </DialogContentText>
          </Grid>

          <Grid item container xs={2} justify="center">
            <ErrorIcon className={classes.icon} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

ErrorPopup.defaultProps = {
  title: ERROR,
  closeDelay: 3000,
};
