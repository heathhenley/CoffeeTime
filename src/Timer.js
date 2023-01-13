import React from 'react';
import play_icon from "./assets/play-circle.png"
import pause_icon from "./assets/pause-circle.png"
import reset_icon from "./assets/reset.png"

// Based on https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553
class Timer extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      time: props.counter,
      isOn: false,
      start: props.counter
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  calculateTimeFraction(){
    return (this.state.start - this.state.time) / this.state.start;
  }

  getStrokeDashArray(){
    return (this.calculateTimeFraction() * 283).toFixed(0) + " 283";
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: this.state.start
    })
    this.timer = setInterval(
      () => {
        const time = (this.state.time - 1 < 0) ? 0 : (this.state.time - 1);
        this.setState({
          time: time
        })
        if (this.state.time === 0) {
          this.stopTimer();
        }
      }, 1000);
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  
  resetTimer() {
    this.setState({time: this.state.start, isOn: false})
  }

  render() {
    let start = (!this.state.isOn) ?
      <button onClick={this.startTimer}>
        <img src={play_icon} alt="Start timer"/>
      </button> :
      null
    let stop = (!this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>
        <img src={pause_icon} alt="Stop timer"/>
      </button>
    let reset =
      <button onClick={this.resetTimer}>
        <img src={reset_icon} alt="Reset timer"/>
      </button>

    return(
      <div className="timer">
        <div className="base-timer">
          <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
            <path
              id="base-timer-path-remaining"
              strokeDasharray={this.getStrokeDashArray()}
              className="base-timer__path-remaining"
              d="M 50, 50
                 m -45, 0
                 a 45,45 0 1,0 90,0
                 a 45,45 0 1,0 -90,0"
      ></path>
          </g>
          </svg>
        <span id="base-timer-label" className="base-timer__label">
          {this.state.time}
        </span>
      </div>
      <div className="timer-controls">
        <div className="row">
          <div className="col-4 offset-2">{start}{stop}</div>
          <div className="col-3">{reset}</div>
        </div>
      </div>
      </div>
    )
  }
}

export default Timer;