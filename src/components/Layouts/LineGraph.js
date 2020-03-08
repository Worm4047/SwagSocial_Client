import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";
// Ref : https://developers.google.com/chart/interactive/docs/gallery/histogram
import { Typography } from "@material-ui/core";
const data = [
  ["Year", "Sales", "Expenses"],
  ["2020", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540]
];
const options = {
  chart: {
    title: "Count of complaints over time",
    subtitle: ""
  }
};
export default class LineGraph extends React.Component {
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
    let heading = ["Date"];
    this.state.types.forEach(type => heading.push(type));
    
    let data = [];
    let uniqDate = [], dateReportTypeDict = {}
    data.push(heading);
    this.state.complaints.forEach((complaint) => {
      let lat = complaint.lat;
      let lon = complaint.long;
      let type = complaint.type;
      let date = complaint.date;
      if(uniqDate.indexOf(date) == -1)
        uniqDate.push(date)
      if(!dateReportTypeDict[date] || !dateReportTypeDict[date][type]){
          dateReportTypeDict[date] = {}
          dateReportTypeDict[date][type] = 0
      }
      dateReportTypeDict[date][type]++;
    })
    uniqDate.forEach((date, i) => {
      let temp = [date]
      for(let reporttype in dateReportTypeDict[date]){
        let colidx = this.state.types.indexOf(reporttype)+1;
        temp.push(dateReportTypeDict[date][reporttype]);
      }
      data.push(temp);
    });
    data.push(["2020/3/6"]);
    data.push(["2020/3/7"]);
    // data.push(["2020/3/4"]);
    data = this.balanceData(data);

    this.setState({
      data : data
    })
    console.log(data);
  }
  render() {
    console.log(data);
    console.log(this.state.data);
    return (
      this.state.data ? 
      <div>
      <Typography variant="h4" className="title">
      Complaints distribution over time {this.state.selected}
   </Typography> 
      <div className="App">
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={this.state.data}
          options={options}
        />
      </div>
      </div>
      :
      ""
    );
  }
}
