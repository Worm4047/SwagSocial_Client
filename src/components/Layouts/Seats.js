import React, { Component, Fragment } from 'react';


// import '../../'
class Seats extends Component {
	constructor(props) {
		super(props);
    console.log(props);
		this.state = {
      seatMap: null
		}
  }
  createCol = (row) => {
    let cols = [];
    for(let c = 0; c < this.state.seatMap[0].length;c++){
      if(this.state.seatMap[row][c] == -1){
        cols.push(<li className="seat">
        <input type="checkbox" id={`${row+1}_${c+1}`} key={`${row+1}_${c+1}`}/>
        <label for={`${row+1}_${c+1}`}>{`${row+1}/${c+1}`}</label>
        </li>)
      }
      else{
        console.log(" -1 not found ");
        cols.push(<li className="seat">
        <input type="checkbox" id={`${row+1}_${c+1}`} key={`${row+1}_${c+1}`} checked/>
        <label for={`${row+1}_${c+1}`}>{`${row+1}/${c+1}`}</label>
        </li>)
      }

    }
    return cols;
  }
  componentWillReceiveProps(nextProps) {
    console.log("Recieved props", nextProps);
    this.setState({ seatMap: nextProps.seatMap });  
  }
  createTable = () => {
    let table = [];
    // console.log(this.state, this.state.seatMap.length);
    var done = 0;
    for (let r = 0; r < this.state.seatMap.length; r++) {
      table.push(<li className={`row row--${r+1}`} key={r+1}><ol className="seats" type="A">
        { 
          this.createCol(r)
        }
      </ol></li>)
    }
    console.log(table);
    return table
  }
  render(){
    console.log("In Seats ", this.state.seatMap);
    return (
      <div>
        <div className="plane ">
          <ol className="cabin fuselage">
                 {this.state.seatMap ? this.createTable() : ''}    
          </ol>
        </div>
      </div>
    );
  }

}

export default Seats;
