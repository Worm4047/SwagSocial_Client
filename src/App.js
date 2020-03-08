import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Layouts/Header';
import Complaints from './components/Layouts/Complaints';
import Map from './components/Layouts/Map';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LineGraph from './components/Layouts/LineGraph';
import BarGraph from './components/Layouts/BarGraph';
import ESRIMap from './components/Layouts/ESRIMap';
import LeaderBoard from "./components/Layouts/LeaderBoard";
import UserComplaints from './components/Layouts/UserComplaints';
import { Typography } from "@material-ui/core";

import socketIOClient from 'socket.io-client'
var socket;

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
},
appBar:{
  fontSize: 18
},
graph:{
  maxWidth: 400
}
};

var ENDPOINT = "https://socioproj-server-dot-socket-server-270005.appspot.com";
// var ENDPOINT = 'http://localhost:8080'
class App extends Component {
  state = {
    selected: "",
    reportSelected: "Resolved vs Unresolved plot",
    types: [],
    complaints: [],
    validComplains: [],
    reportTypes: ["area-wise distribution","Resolved vs Unresolved plot"],
    socket: null,
    mapCenter: [-111.9400,33.4255],
    userMapping: null,
    leaderBoard: false,
    selectedUser: 0
  }

  constructor(props){
    super(props);
    this.getAllComplaints()
    this.handleMapCenter = this.handleMapCenter.bind(this);
    this.handleSelectedUser = this.handleSelectedUser.bind(this);
    this.markResolved = this.markResolved.bind(this);
    this.getComplaints = this.getComplaints.bind(this);
  }

  getAllComplaints(){
    fetch(ENDPOINT+'/api/getAllComplaints/')
    .then(response => response.json())
    .then(data => {
      this.setState({
        allComplaints: data['complaints'],
      })
      return data;
    })
    .then(data => {
      this.createLeaderBoardData(data);
    })
  }


  getComplaints(selected){
    fetch(ENDPOINT+'/api/getComplaints/' + selected)
    .then(response => response.json())
    .then(data => data['complaints'].filter(complaint => !complaint.status))
    .then(data => {
      console.log("Inside getcomplaints", data, this.state.selected);
      this.setState({
        complaints: data,
      })
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
      this.getAllComplaints();
    });
  }

  handleSelectedUser(idx){
    console.log(idx);
    console.log(this.state.userMapping[idx]);
    this.setState({
      selectedUser: idx
    })
  }

  createLeaderBoardData(data){
    let users = {}
    console.log(data);
    data['complaints'].forEach(element => {
      let user = element.userid;
      if(!users[user])
        users[user] = []
      users[user].push(element);
    });
    let arr = []
    for(let u in users)
      arr.push(users[u])
    arr.sort(function(a, b){
      var keyA = a.length, 
          keyB =  b.length
      // Compare the 2 dates
      if(keyA > keyB) return -1;
      if(keyA < keyB) return 1;
      return 0;
  });
  let arr2 = [];
  let i=1;
    for(let u in arr){
      console.log(u);
      arr2[u] = {}
      arr2[u]['rank'] = i;
      arr2[u]['userid'] = arr[u][0].userid;
      arr2[u]['points'] = arr[u].length;
      arr2[u]['complaints'] = arr[u];
      i++;
    }
    this.setState({
      userMapping: arr2
    })
  }

  handleMapCenter(centerPoint){
    console.log("Map clicked ", centerPoint);
    this.setState({
      mapCenter: [parseFloat(centerPoint.lon), parseFloat(centerPoint.lat)]
    })
  }

  handleMenuSelect = selected => {
    console.log(selected);
    this.setState({
      selected : selected,
      reportSelected: "",
      leaderBoard: false
    })
    this.getAllComplaints();
  }

  handleReportMenuSelected = selected => {
    console.log(selected);
    this.setState({
      reportSelected: selected,
      selected: "",
      leaderBoard: false
    })
    this.getAllComplaints();
  }

  handleLeaderBoard = () => {
    this.setState({
      reportSelected: "",
      selected: "",
      leaderBoard: true
    })
    this.getAllComplaints();
  }

  getTypes(){
    fetch(ENDPOINT + "/api/allTypes/")
    .then(response => response.json())
    .then(data => {
      this.setState({
        types: data['types'],
        selected: ""
      })
    })
  }

  componentDidMount(){
    this.timer = setInterval(()=> this.getAllComplaints(), 5000);
  }

  componentWillUnmount() {
    this.timer = null; // here...
  }

  componentWillMount() {
    this.getTypes();
}

  render(){
    const sel = this.state.selected;
    const idx = this.state.reportTypes.indexOf(this.state.reportSelected);
    return (
      <div>
        <Header 
        handleMenuClick = { this.handleMenuSelect }
        handleReportClick = {this.handleReportMenuSelected}
        handleLeaderBoard = {this.handleLeaderBoard}
        selected = {this.state.selected}
        types = {this.state.types}
        reportTypes = {this.state.reportTypes}
        />

        {this.state.selected.length > 0 ? 
          <Grid
          container
          direction="row"
          justify="space-around"
          style={{marginTop: '40px'}}
        >
          <Grid item xs={12} md={5} lg={5} 
            style={{maxHeight:'450px', overflowY:'auto'}}
          >
        <Typography variant="h4" className="title">
         Showing Complaints For {this.state.selected}
        </Typography> 
          <Complaints
              complaints = {this.state.allComplaints.filter(complaint => complaint.type == this.state.selected && !complaint.status)}
              selected = {this.state.selected}
              handleMapCenter = {this.handleMapCenter}
              style={{marginTop:'50px'}}
              markResolved = {this.markResolved}
              getComplaints = {this.getComplaints}

            />
          </Grid>

          <Grid item xs={12} md={5} lg={6} style={{height:'100%'}} >
          <div >
              {/* <Map
              style={{maxHeight:'400px'}}
              complaints = {this.state.complaints}
              /> */}
              <ESRIMap 
                complaints = {this.state.allComplaints.filter(complaint => complaint.type == this.state.selected && !complaint.status)}
                center={this.state.mapCenter}
                type={this.state.selected}
            />
          </div>
          </Grid>
            
        </Grid>
        : ""
  }

  
        { this.state.reportTypes.indexOf(this.state.reportSelected) != -1 ? 
              <Grid
              container
              direction="row"
              justify="space-around"
              spacing={2}
            >
              <Grid item xs={12} md={8} lg={8} style={{maxHeight:'500px', marginTop:'50px'}}>
           {this.state.reportTypes.indexOf(this.state.reportSelected) == 0 && this.state.allComplaints && this.state.types.length>0?
            <LineGraph 
            complaints = {this.state.allComplaints}
            types = {this.state.types}
            /> : 
            this.state.reportTypes.indexOf(this.state.reportSelected) == 1 && this.state.allComplaints && this.state.types.length>0? <BarGraph 
            complaints = {this.state.allComplaints}
            types = {this.state.types}/> : 
            this.state.reportTypes.indexOf(this.state.reportSelected) == 2 ? <ESRIMap 
              center={this.state.center}
            
            /> :
              <p>Nothing Selected</p>
            }
            </Grid>

          </Grid>
          : 
          <p></p>
        }

        {this.state.leaderBoard ? 
        <Grid
          container
          direction="row"
          justify="space-around"
          // spacing={2}
        >
        <Grid item xs={12} md={4} lg={4} style={{maxHeight:'500px'}}>
          <LeaderBoard 
            userdata = {this.state.userMapping}
            handleSelectedUser = {this.handleSelectedUser}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{maxHeight:'500px', overflowY: 'auto'}}>
          <UserComplaints 
            handleMapCenter = {this.handleMapCenter}
            data = {this.state.userMapping[this.state.selectedUser]}
          />
        </Grid>
        </Grid> :  <p></p>}

        
      </div>
    );
  }

}

export default App;
