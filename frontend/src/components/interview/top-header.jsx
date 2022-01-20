import React from "react";

class TopHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2 className="center"> Spring 2022 </h2>
        <h3 className="center">HopHacks Organizer Interviews</h3>
        {this.props.role === 'Admin' ? <h1 className="center">Admin Page</h1> : ''}
      </>
    )
  }
}

export default TopHeader