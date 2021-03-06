import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 0, 0, 1),
  },
  title: {
    padding: theme.spacing(1, 0),
    pointerEvents: "none",
  },
}));

export default function Popup({
  title,
  open,
  maxWidth,
  closeDisabled,
  children,
  onClose,
}) {
  const classes = useStyles();

  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open}>
      <DialogTitle className={classes.header} disableTypography>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>

        <IconButton onClick={onClose} disabled={closeDisabled}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

Popup.defaultProps = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  maxWidth: PropTypes.string,
  closeDisabled: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Popup.defaultProps = {
  maxWidth: "sm",
  closeDisabled: false,
};
