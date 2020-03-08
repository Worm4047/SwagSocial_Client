import React from "react";
import { Typography } from "@material-ui/core";
// Components
import LeaderBoardTable from "./LeaderBoardTable";

class LeaderBoard extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      userdata : props.userdata,
      handleSelectedUser : props.handleSelectedUser
    }
  }

  componentWillReceiveProps(props){
        this.setState({
          userdata : props.userdata
        })
    }
  render(){
    return (
      <div>
        <Typography variant="h4" className="title">
          Leaderboard
        </Typography>
        <LeaderBoardTable users={this.state.userdata} handleSelectedUser = {this.state.handleSelectedUser} />
      </div>
    );
  }

};

export default LeaderBoard;
