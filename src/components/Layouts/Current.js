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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import StudentTable from './Table';

import Seats from './Seats';


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
		width: 300
	},
	formControl: {
		margin: 10,
		// minWidth: 200,
	  },
	  selectEmpty: {
		marginTop: 10,
	  },
	  InputLabel:{
		  width: 200
	  }
  };

  function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat};
  }
  
  const rows = [
	{'student_name' : 'Abhishek', 'student_id':159, 'class_id' : 'cse123'},
	{'student_name' : 'Arnav', 'student_id':123, 'class_id' : 'cse122'},
	{'student_name' : 'Devesh', 'student_id':190, 'class_id' : 'cse124'},
  ];
var resetMap = null;
class Current extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedClass : null,
			valid: false,
			seats: 50,
			rows: 5,
			cols: 10,
			classes: props.classes,
			socket: props.socket,
			attendances: [],
			seatMap: Array(props.classes.length).fill().map(() => Array(5).fill().map(() => Array(10).fill(-1))),
		}
		resetMap = Array(props.classes.length).fill().map(() => Array(5).fill().map(() => Array(10).fill(-1)));
		this.handleChange = this.handleChange.bind(this);
	}
	getCurrentDate(){
		let ts = Date.now();
		let date_ob = new Date(ts);
		let date = date_ob.getDate();
		let month = date_ob.getMonth() + 1;
		let year = date_ob.getFullYear();
		return year + "-" + month + "-" + date;
	}
  handleChange(e) {
	this.setState({ selectedClass: e.target.value, valid: true });
	this.getAttendance(e.target.value, this.getCurrentDate());
  }

  getAttendance(class_id, cur_date){
	fetch("http://chirp-server-dot-socket-server-270005.appspot.com/api/getAttendance/"+class_id+"/"+cur_date)
    .then(response => response.json())
    .then(data => {
		let count = data.attendance.length;
		let seatMap = Array(this.state.classes.length).fill().map(() => Array(5).fill().map(() => Array(10).fill(-1)));
		let rowidx = -1, colidx = -1;
		let idx = this.state.classes.indexOf(class_id);
		console.log("Count ", count);
		while(count){
			rowidx = this.getRandomInt(0, this.state.rows-1);
			colidx = this.getRandomInt(0, this.state.cols-1);
	
			while(seatMap[idx][rowidx][colidx] != -1){
				rowidx = this.getRandomInt(0, this.state.rows-1);
				colidx = this.getRandomInt(0, this.state.cols-1);
			}
			seatMap[idx][rowidx][colidx] = count;
			count--;
		}
		this.setState({
			seatMap: seatMap,
			attendances: data.attendance
		})
    })
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  componentDidMount(){

	this.state.socket.on("update", data => {

		// console.log("Recieved attendance for ", data);
		this.setState((prevState) => {
			prevState.attendances.push(data)
			return {attendances: prevState.attendances};
		})
		let rowidx = -1, colidx = -1;
		let idx = this.state.classes.indexOf(data.class_id);
		rowidx = this.getRandomInt(0, this.state.rows-1);
		colidx = this.getRandomInt(0, this.state.cols-1);
		let seatMap = this.state.seatMap;
		// console.log(seatMap, idx, rowidx, colidx);
		while(seatMap[idx][rowidx][colidx] != -1){
			rowidx = this.getRandomInt(0, this.state.rows-1);
			colidx = this.getRandomInt(0, this.state.cols-1);
		}
		seatMap[idx][rowidx][colidx] = this.state.attendances.length;
		this.setState({
			seatMap: seatMap
		})
	})
  }

  render(){
	// const classes = useStyles();
	console.log("Attendances ", this.state.attendances);
	console.log("SeatMap ", this.state.seatMap[this.state.classes.indexOf(this.state.selectedClass)]);
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
					onChange={this.handleChange}
					>
						
						{this.state.classes.map(item => (
							<MenuItem value={item} key={item}>{item}</MenuItem>
						))}
					</Select>
					<Grid container justify="space-around">


</Grid>
					{/* <Button variant="outlined" color="secondary" onClick={this.handleClick}>
  						Submit
				  </Button> */}
							</FormControl>

			  </Paper>
            </Grid>
			
          </Grid>
		  </div>
		  {this.state.valid  ? 		  
		  <div style={useStyles.root}>
		  	<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			>
				<Grid item xs={12} lg={7} md={6}>
					<Seats
					seatMap = {this.state.seatMap[this.state.classes.indexOf(this.state.selectedClass)]}
					/>
				</Grid>
				<Grid item xs={12} lg={4} md={5}>
					<StudentTable attendances={this.state.attendances} />
				</Grid>

			</Grid>
			</div> : 
			"" }
		</Fragment>
      );
  }

}

export default Current;
