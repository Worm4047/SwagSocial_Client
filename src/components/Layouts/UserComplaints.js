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

// var ENDPOINT = 'http://localhost:8080'
var ENDPOINT = "https://socioproj-server-dot-socket-server-270005.appspot.com";
class UserComplaints extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      userdata : props.data['complaints'].filter(complaint => !complaint.status)
    }
  }

  componentWillReceiveProps(props){
        this.setState({
          userdata : props.data['complaints'].filter(complaint => !complaint.status)
        })
    }

    markResolved(complaint){
      console.log("Resolving ", complaint)
      complaint['status'] = true;
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(complaint)
      };
      console.log(requestOptions);
      var selected = this.state.selected;
      fetch(ENDPOINT + '/api/markResolved', requestOptions)
      .then( res => res.json())
      .then(data => {
        console.log("Getting complaints after resolving ", this.state.selected)
        // this.getComplaints(this.state.selected);
      });
    }

  render(){
    return (
      <div>

        <Typography variant="h4" className="title">
         Showing Complaints For {this.state.userdata.userid}
        </Typography> 
        <TableContainer component={Paper} style={{marginTop:'20px'}}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
        <TableRow>
          <TableCell >Date</TableCell>
          <TableCell >Status</TableCell>
          <TableCell >Type</TableCell>
          <TableCell >Action</TableCell>
        </TableRow>
        </TableHead>
        {this.state.userdata.length > 0 ?
        <TableBody  class="center-align">
        {this.state.userdata.map(row => (
          <TableRow key={row.lat+row.lon}>
          <TableCell component="th" scope="row">
            {row.date}
          </TableCell>
          <TableCell component="th" scope="row">
            {!row.status ? <p>RESOLVED</p> : <p>UNRESOLVED</p>}
          </TableCell>
          <TableCell>{row.type}</TableCell>
          <TableCell component="th" scope="row">
            {!row.status ?
              <Button variant="outlined" color="secondary" onClick={(e) => {
                this.markResolved(row)
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
        : <Typography variant="h6" className="title">
            All Complaints Are Resolved
       </Typography>  }
      </Table>
    </TableContainer>
        
      </div>
    );
  }

};

export default UserComplaints;
