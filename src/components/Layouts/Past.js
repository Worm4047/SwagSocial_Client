import 'date-fns';
import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import StudentTable from './Table';
const useStyles = {
  root: {
  flexGrow: 1,
  marginTop: 30
  },
  paper: {
    padding: 5,
    textAlign: 'center',
},
title:{
  fontWeight: 300
},
textField:{
  textAlign: 'center',
  marginRight: 30,
  width: 200
}
};

class Past extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
      selectedClass : null,
      selectedDate : this.getCurrentDate(),
			valid: false,
      seats: 50,
      classes: props.classes,
      socket: props.socket,
      attendances: null
		}
	
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
	}

	getCurrentDate(){
		let ts = Date.now();
		let date_ob = new Date(ts);
		let date = date_ob.getDate();
		let month = date_ob.getMonth() + 1;
		let year = date_ob.getFullYear();
		return year + "-" + month + "-" + date;
	}

  handleClassChange(e) {
    this.setState({ selectedClass: e.target.value});
  }

  handleDateChange(value){
    console.log(value);
    let date_ob = new Date(value);
		let date = date_ob.getDate();
		let month = date_ob.getMonth() + 1;
		let year = date_ob.getFullYear();
    let d = year + "-" + month + "-" + date;
    console.log(d);
    this.setState({ selectedDate: d});
  }

  handleClick(){
    this.getAttendance(this.state.selectedClass, this.state.selectedDate);
    if(this.state.selectedClass && this.state.selectedDate){
      this.setState({
        valid: true
      })
    }

  }

  getAttendance(class_id, cur_date){
    fetch("http://chirp-server-dot-socket-server-270005.appspot.com/api/getAttendance/"+class_id+"/"+cur_date)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          attendances: data.attendance
        })
      })
    }
  

    render(){
      // const classes = useStyles();
        return (
        <Fragment>
            <div style={useStyles.root}>
              <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          >
                <Grid item xs={8}>
                <Paper style={useStyles.paper}>
				  <h1 style={useStyles.title}>Select class</h1>
				    <FormControl className={useStyles.formControl}>
        			<InputLabel id="class-select-asas" className={useStyles.InputLabel}>Class Id</InputLabel>
              <Select
              labelId="class-select-label"
              id="class-simple-select"
              value={this.state.selectedClass}
              onChange={this.handleClassChange}
              >

              {this.state.classes.map(item => (
                <MenuItem value={item} key={item}>{item}</MenuItem>
              ))}
            </Select>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">

                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="yyyy-MM-dd"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
          </MuiPickersUtilsProvider>
					<Button variant="outlined" color="secondary" onClick={this.handleClick}>
  						Submit
				  </Button>
				</FormControl>

			  </Paper>
                </Grid>
          
              </Grid>
          </div>
          {this.state.valid && this.state.attendances  ? 
          <div style={useStyles.root}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              >
            <Grid item xs={8}>
              <StudentTable attendances={this.state.attendances} />
            </Grid>
            </Grid>
          </div> : "" }

        </Fragment>
          );
      }

}

export default Past;
