import React from 'react';
import { loadModules } from 'esri-loader';
import './ESRIMap.css';


export default class  ESRIMap extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.state = {
            center: props.center,
            type: props.type,
            complaints: props.complaints
        }
    }

    componentWillReceiveProps(props){
        console.log("Inside ESRI again ", props, this.state);
        if(!props.center || (props.center[0] == this.state.center[0] && props.center[1] == this.state.center[1]))
            return;
        console.log("Updating Center")
        this.setState({
            center: props.center,
            type: props.type,
            complaints: props.complaints
        })
        this.loadMap();
    }

    loadMap(){
        loadModules(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/Basemap",
            "esri/layers/VectorTileLayer"], { css: true })
            .then(([Map, MapView, FeatureLayer, Basemap, VectorTileLayer]) => {
                var basemap = new Basemap({
                    baseLayers: [
                        new VectorTileLayer({
                            portalItem: {
                                id: '4cc943d06f7841b9b0f4a278d8ba8380'
                            }
                        })
                    ]
                });

                var map = new Map({
                    // basemap: "topo-vector",
                    basemap: basemap
                });

                var complaintRenderer = {
                    type: "simple",
                    symbol: {
                        type: "picture-marker",
                        url: "https://image.flaticon.com/icons/svg/497/497738.svg",
                        width: "18px",
                        height: "18px"
                    }
                }
                var complaintLabels = {
                    symbol: {
                        type: "text",
                        color: "#FFFFFF",
                        haloColor: "#5E8D74",
                        haloSize: "2px",
                        font: {
                            size: "12px",
                            family: "Noto Sans",
                            style: "italic",
                            weight: "normal"
                        }
                    },
                    labelPlacement: "above-center",
                    labelExpressionInfo: {
                        expression: "$feature.CMPLNT_TYPE"
                    }
                };
                var lyr = new FeatureLayer({
                    url: "https://services7.arcgis.com/qIkTsWRSkRHuOlv1/ArcGIS/rest/services/complaints/FeatureServer/0",
                    outFields: ["*"],
                    renderer: complaintRenderer,
                    labelingInfo: [complaintLabels],
                    popupTemplate: {
                        // title: "Complaints",
                        content: "Oh Wack! {CMPLNT_TYPE} spotted here on {DATE}"
                    }
                })
                map.add(lyr)

                function setFeatureLayerFilter(expression) {
                    lyr.definitionExpression = expression;
                }

                var view = new MapView({
                    container: this.mapRef.current,
                    map: map,
                    center: this.state.center, // longitude, latitude
                    zoom: 8
                });

                function setFeatureLayerViewFilter(expression) {
                    view.whenLayerView(lyr).then(function (featureLayerView) {
                        featureLayerView.filter = {
                            where: expression
                        };
                    });
                }

                setFeatureLayerViewFilter("CMPLNT_TYPE = '" + this.state.type + "'");
                
                // var basemapToggle = new BasemapToggle({
                //     view: view,
                //     secondMap: "satellite"
                // });

                // var basemapGallery = new BasemapGallery({
                //     view: this.view,
                //     source: {
                //         portal: {
                //             url: "https://www.arcgis.com",
                //             useVectorBasemaps: true  // Load vector tile basemaps
                //         }
                //     }
                // });

                // view.ui.add(selectFilter, "top-right");
                // view.ui.add(basemapToggle, "bottom-right");
                // this.view.ui.add(basemapGallery, "top-right");
                this.view = view
            });
    }

    componentDidMount() {
        this.loadMap()
    }

    componentWillUnmount() {
        if (this.view) {
            // destroy the map view
            this.view.container = null;
        }
    }

    render() {
        return (<
            div className="webmap"
            ref={this.mapRef}
        />
        );
    }
}