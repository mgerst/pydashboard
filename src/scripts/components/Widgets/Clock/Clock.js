import React, { PropTypes as T } from 'react';
import Widget from '../Widget';

export default class Clock extends Widget {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }

    this.startTime = this.startTime.bind(this);
    this.formatTime = this.formatTime.bind(this);

    setInterval(this.startTime, 500);
  }

  startTime() {
    const today = new Date();

    let h = today.getHours()
    let m = today.getMinutes()
    let s = today.getSeconds()
    m = this.formatTime(m)
    s = this.formatTime(s)

    this.setState({data: {
      time: `${h}:${m}:${s}`,
      date: today.toDateString()
    }});

  }

  formatTime(i) {
    if (i < 10) {
      return "0" + i
    } else {
      return i
    }
  }

  render() {
    const { date, time } = this.state.data;

    return (
      <div className="widget widget-clock">
        <h1>{ date }</h1>
        <h2>{ time }</h2>
      </div>
    );
  }
}
