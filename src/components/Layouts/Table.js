import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

var ENDPOINT = 'http://localhost:8080'
// var ENDPOINT = "https://socioproj-server-dot-socket-server-270005.appspot.com";


export default class ComplaintTable extends React.Component {
  
  constructor(props){
      super(props);
      this.state = {
        complaints : props.complaints,
        selected : props.selected,
        handleMapCenter :  props.handleMapCenter,
        markResolved : props.markResolved,
        getComplaints : props.getComplaints
    }
  }
	componentWillReceiveProps(props){
    console.log("Inside table again ", props);
		this.setState({
      complaints : props.complaints,
      selected: props.selected,
      handleMapCenter: props.handleMapCenter,
      markResolved : props.markResolved,
			getComplaints : props.getComplaints
		})
	}



  render(){
    return (
      <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
        <TableRow>
          <TableCell >Date</TableCell>
          <TableCell >Status</TableCell>
          <TableCell >Action</TableCell>
        </TableRow>
        </TableHead>
        {this.state.complaints.length > 0 ?
        <TableBody  class="center-align">
        {this.state.complaints.map(row => (
          <TableRow key={row.lat+row.lon}>
          <TableCell component="th" scope="row">
            <a onClick = {(e) => {this.state.handleMapCenter(row)} }>{row.date}</a>
          </TableCell>
          <TableCell component="th" scope="row">
            {!row.status ? <p>RESOLVED</p> : <p>UNRESOLVED</p>}
          </TableCell>
          <TableCell component="th" scope="row">
            {!row.status ?
              <Button variant="outlined" color="secondary" onClick={(e) => {
                // e.target.disabled = true
                // e.target.value = "Resolved"
                // console.log(e.target, e.target.disabled);
                this.state.markResolved(row)
              }}>
                    Mark resolved
              </Button>
              :
              <Button variant="outlined" color="secondary" disabled>
                Resolved
        </Button>
            }
  
          </TableCell>
          </TableRow>
          
        ))}
        </TableBody>
        :  <Typography variant="h6" className="title">
        All Complaints Are Resolved
   </Typography>   }
      </Table>
    </TableContainer>
    );
  }

}
