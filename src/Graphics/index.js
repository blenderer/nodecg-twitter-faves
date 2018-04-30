import React, { Component } from 'react';
import logo from '../logo.svg';

class Graphics extends Component {
  styles = {
    tweet: {
      marginBottom: 15
    }
  }

  replicant = window.nodecg.Replicant('approvedFaves')
  state = {
    faves: []
  }

  componentDidMount() {
    this.replicant.on('change', this.onUpdate);
  }

  onUpdate = (newVal) => {
    this.setState({
      faves: newVal
    });
  }

  render() {
    const { faves } = this.state;

    return (
      <ul>
        {faves.map((tweet) => (
          <li key={tweet.id} style={this.styles.tweet}>
            {tweet.text}
            <br/>
            <strong>@{tweet.user.screen_name}</strong>
          </li>
        ))}
      </ul>
    );
  }
}

export default Graphics;
