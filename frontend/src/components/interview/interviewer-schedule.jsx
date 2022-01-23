import React from "react";
import dayjs from 'dayjs'

class InterviewerSchedule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var result = this.props
    var start_date = result['start_date'];
    var start_time = result['start_time'];
    var days = result['days'];
    var hours = result['hours'];
    var num_int = result['num_int'];
    var interviews = result['interviews'];
    var list = Array.from({ length: num_int })
    if (!num_int){
      num_int = '0'
    }


    return (
      <div className="card">
        <h1 className="center">Interview Summary</h1>
        <p>
          <strong>Name:</strong> {this.props.name}<br />
          <strong>Role:</strong> {this.props.role}<br />
          <strong>Team:</strong> {this.props.team}<br />
          <strong>Interviews: </strong>{this.props.num_int} interview(s) in total.<br />
        </p>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Interviewee</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {
              interviews && interviews.length && list.map((o, i) => {
                var time = interviews[i][0];
                
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
                var interviewee = interviews[i][1][1];
                return (<tr><td>{final}</td><td>{interviewee}</td></tr>)
              })
            }
          </tbody>
        </table>
        <div className="center">
          <br /><a href="#!" onClick={() => this.props.callback()} className="btn btn--secondary">Sign Out</a>
        </div>
      </div>
    )
  }
}

export default InterviewerSchedule