import React, { Component, Fragment } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import { Container } from "@material-ui/core"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 33.448376, lng: -112.074036}}>
      {props.complaints.map(marker => {
        return (
          <Marker
			onClick={props.handleClick}
			key={marker.id}
            position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lon) }}
            placeIndex={marker.id}
            name={marker.type}
          />
        )
      })}
        {/* <InfoWindow
          marker={props.activeMarker}
          visible={props.showingInfoWindow}
          onClose={props.handleClose}
        >
          <div>
			<h1>Info window</h1>
			<img src='http://i.stack.imgur.com/g672i.png' />
		</div>
        </InfoWindow> */}
    </GoogleMap>
  )
})

export default class MyMap extends Component {
	constructor(props){
		super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            complaints: props.complaints
          };
          this.handleMarkerClick = this.handleMarkerClick.bind(this);
          this.handleClose = this.handleClose.bind(this);
	}

    handleMarkerClick = (props, marker, e) => {
        this.setState({
          selectedPlace: this.state.complaints[props.placeIndex],
          activeMarker: marker,
          showingInfoWindow: true
        });
      };
    
      handleClose = () => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
      };

	componentWillReceiveProps(props){
		this.setState({
			complaints: props.complaints
		})
	}


  render() {
    return (
		<Fragment>
			<Container>
			<MapWithAMarker
				complaints={this.state.complaints}
				activeMarker={this.state.activeMarker}
				handleClick = {this.handleMarkerClick}
				showingInfoWindow = {this.state.showingInfoWindow}
				handleClose = {this.state.handleClose}
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfnMT32j2IPKOiQBkmnfEEUWiLiNKRo0o&libraries=places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px`, marginTop: '30px'}} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
			</Container>
	  </Fragment>
    )
  }
}