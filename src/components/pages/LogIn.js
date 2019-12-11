import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LogIn extends Component {
  onClick() {
    axios.get('//127.0.0.1/login')
      .then(res => {
        console.log(res.data)
      })
  }

  render() {
    return (
      <div className="about-page">
        <div className="about-container">
          <h1>Log Out/In</h1>
          <p>{this.props.id}</p>
          <button onClick={this.onClick}>Log In</button>
          <Link to={"//127.0.0.1/disconnect"}>Log Out</Link>
        </div>
      </div>
    )
  }
}

export default LogIn
