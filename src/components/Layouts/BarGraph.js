import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
import { Typography } from "@material-ui/core";
// const data = [
//   ["Year", "Visitations", { role: "style" }],
//   ["2010", 10, "color: gray"],
//   ["2020", 14, "color: #76A7FA"],
//   ["2030", 16, "color: blue"],
//   ["2040", 22, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
// ];

const data = [
  ["Year", "Visitations"],
  ["2010", 10],
  ["2020", 14],
  ["2030", 16],
  ["2040", 22],
];

export default class BarGraph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      complaints : props.complaints,
      types : props.types,
      data : null
    }
    console.log("Inside linegraph ", props.complaints);
  }

  componentDidMount(){
    this.formatData();
  }

  balanceData(data){
    let len = this.state.types.length+1;
    for(let i=0;i<data.length;i++){
      for(let j=data[i].length;j<len;j++)
        data[i].push(Math.floor(Math.random() * 10));
    }
    return data;
  }

  formatData(){
    let heading = [[" Incident Type ", " Resolved ", " UnResolved "]]
    this.state.types.forEach(type => heading.push([type]));
    console.log("heading ", heading);
    let data = [];
    let typeUnResolvedDict = {}, typeResolvedDict = {}
    this.state.complaints.forEach((complaint) => {
      let lat = complaint.lat;
      let lon = complaint.long;
      let type = complaint.type;
      let date = complaint.date;
      let status = complaint.status ? complaint.status : false;
      if(!typeUnResolvedDict[type] )
        typeUnResolvedDict[type] = 0;
      if(!typeResolvedDict[type])
        typeResolvedDict[type] = 0;
        if(!status)
          typeUnResolvedDict[type]++;
        else
          typeResolvedDict[type]++;
    })
    this.state.types.forEach((type, i) => {
      heading[i+1].push(typeResolvedDict[type]);
      heading[i+1].push(typeUnResolvedDict[type]);
    })
    console.log(heading);
    this.setState({
      data : heading
    })
    console.log(data);
  }
  render() {
    return (
      <div className="App">

         {this.state.data ? 
         <div>
                 <Typography variant="h4" className="title">
                   Resolved/Unresolved complaints {this.state.selected}
                </Typography> 
                <Chart chartType="BarChart" width="100%" height="400px" data={this.state.data} />
              </div> : ""}
      </div>
    );
  }
}
