import React, { Component } from 'react';
import logo from '../logo.svg';
import './style.css';

class Graphics extends Component {
  styles = {
    tweet: {
      marginBottom: 15
    },
    container: {
      backgroundColor: 'purple',
      color: 'white'
    },
    username: {
      textAlign: 'right'
    }
  }

  presentedTweetReplicant = window.nodecg.Replicant('presentedTweet');

  state = {
    presentedTweet: null
  }

  componentDidMount() {
    this.presentedTweetReplicant.on('change', this.onUpdate);
  }

  onUpdate = (newVal) => {
    this.setState({
      presentedTweet: newVal
    });
  }

  render() {
    const { presentedTweet } = this.state;

    if (!presentedTweet) {
      return null;
    }

    return (
      <div style={this.styles.container}>
        <h1 dangerouslySetInnerHTML={{__html: presentedTweet.text}}>
        </h1>
        <h2 style={this.styles.username}>
          @{presentedTweet.user.screen_name}
        </h2>
      </div>
    );
  }
}

export default Graphics;
