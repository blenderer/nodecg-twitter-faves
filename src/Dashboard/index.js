import React, { Component } from 'react';

class Dashboard extends Component {
  styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    list: {
      height: 300,
      overflowY: 'scroll'
    }
  }

  displayReplicant = window.nodecg.Replicant('test');
  replicant = window.nodecg.Replicant('twitterFaves');
  paused = window.nodecg.Replicant('paused');

  state = {
    faves: [],
    paused: false
  };

  onChange = (e) => {
    this.displayReplicant.value = e.target.value;
  }

  componentDidMount() {
    this.replicant.on('change', this.onUpdate);
  }

  onUpdate = (newVal) => {
    if (!this.state.paused) {
      this.setState({
        faves: newVal
      });
    }
  }

  presentTweet = (tweet) => {
    window.nodecg.sendMessage('presentTweet', tweet);
  }

  togglePause = () => {
    this.setState({
      paused: !this.state.paused
    });
  }

  render() {
    const { faves, paused } = this.state;

    return (
      <React.Fragment>
        <div style={this.styles.container}>
          {/* <input onChange={this.onChange} type="text"/> */}
        </div>
        <div>
          <button onClick={this.togglePause}>
            {paused ? 'Resume' : 'Pause'}
          </button>
        </div>
        <ul style={this.styles.list}>
          {faves.map((tweet) => (
            <li key={tweet.id} style={this.styles.tweet}>
              {tweet.text}
              <br/>
              <strong>@{tweet.user.screen_name}</strong>
              <br/>
              <button onClick={() => { this.presentTweet(tweet) }}>Present Tweet</button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Dashboard;
