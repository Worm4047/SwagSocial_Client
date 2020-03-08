import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import LineGraph from './LineGraph'
import { Grid } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LineGraphDialog(props) {
    console.log(props);

  return (
    <div>

      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>

        <AppBar className="BarGraphDialog">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className="BarGraphTypo">
              Close
            </Typography>

          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          >
        <Grid xs={6}><LineGraph /></Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
