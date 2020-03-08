import React, { Component, Fragment } from 'react';
import ComplaintTable from '../Layouts/Table';

var ENDPOINT = "https://socioproj-server-dot-socket-server-270005.appspot.com";
class Complaints extends Component {
	constructor(props) {
		super(props);
		this.state = {
			complaints: props.complaints,
			selected: props.selected,
			handleMapCenter: props.handleMapCenter,
			markResolved : props.markResolved,
			getComplaints : props.getComplaints
		}
	}
	componentWillReceiveProps(props){
		console.log("Inside complaint again ",props, this.state)
		this.setState({
			complaints: props.complaints,
			selected: props.selected,
			handleMapCenter: props.handleMapCenter
		})
	}

  	render(){
		const sel = this.state.selected;
		console.log("Inside Complaints ", this.state.complaints)
		return (
		<div>
			<ComplaintTable 
			complaints = {this.state.complaints}
			selected = {this.state.selected}
			handleMapCenter = {this.state.handleMapCenter}
			markResolved = {this.state.markResolved}
			getComplaints = {this.state.getComplaints}
			/>
		</div>
		);
  	}

}

export default Complaints;
