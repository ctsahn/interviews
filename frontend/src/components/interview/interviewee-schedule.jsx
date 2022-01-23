import React from "react";
import dayjs from 'dayjs'

class IntervieweeSchedule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var result = this.props
    var start_date = result['start_date'];
    var start_time = result['start_time'];
    var days = result['days'];
    var hours = result['hours'];
    var time = result['final_time'];

                
    var day = Math.floor(time % 14);
    
    var time_slot = Math.floor(time/14 + 1);

    var hour = 0;

    var half = ":00";

    if(time_slot%2 == 0){
      half = ":30";
      hour = hour-1;
    }

  
    hour=hour+Math.floor(time_slot/2);

    if(hour == 0){
      hour = 12;
    }

    var date = dayjs(start_date).add(day, 'day');

    
    var final = date.format("MM/DD") + " " +hour.toString(10)+half+ "PM"

    if(final.includes("NaN")){
      final = "TBD";
    }

    return (
      <div className="card">
        <h1 className="center">Scheduled Interview</h1>
        <p><strong>Name:</strong> {this.props.name}</p>
        <p><strong>Interest 1:</strong>  {this.props.interest1}</p>
        <p><strong>Interest 2:</strong> {this.props.interest2}</p>
        <p id="interview_time"><strong>Interview Time: </strong>{final}</p>
        <div className="center">
          <br /><a href="#!" onClick={() => this.props.callback()} className="btn btn--secondary">Sign Out</a>
        </div>
      </div>
    )
  }
}

export default IntervieweeSchedule