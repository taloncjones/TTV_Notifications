import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layout/Header';
import About from './components/pages/About';
import LogIn from './components/pages/LogIn';
import Stream from './components/pages/Stream';
import TopStreams from './components/streams/TopStreams';
import TopGames from './components/games/TopGames';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      games: [],
      follows: [],
      id: '',
      isFetching: false,
    };
  }

  fetchData() {
    this.setState({ isFetching: true })
    axios.get('//127.0.0.1/json', { withCredentials: true })
      .then(res => {
        this.setState({
          streams: res.data['streams']['data'],
          games: res.data['games']['data'],
          follows: res.data['follows'],
          id: res.data['login']
        })
      })
    this.setState({ isFetching: false })
  }

  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(() => {
      this.fetchData()
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    // axios.get('//127.0.01/whoami', { withCredentials: true })
    // .then(res => {
    //   this.setState({ id: res.data })
    // })

    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/:stream" component={Stream} />
              <Route path="/">
                <TopStreams streams={this.state.streams} />
                <TopGames games={this.state.games} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
