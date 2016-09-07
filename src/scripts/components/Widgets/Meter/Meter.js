import React from 'react';
import Widget from '../Widget';

import Dial from 'react-dial';

export default class Meter extends Widget {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: props.title,
        value: props.value,
        moreInfo: props.moreInfo,
        updatedAt: props.updatedAt,
        min: props.min,
        max: props.max,
      }
    };
  }

  render() {
    const { title, value, moreInfo, updatedAt, min, max } = this.state.data;
    const updatedAtMessage = this.updatedAtMessage;

    return (
      <div className="widget widget-meter">
        <h1 className="title">{ title }</h1>
        <Dial value={value} min={min} max={max}
          angleOffset={-125} angleArc={250} lineCap={"round"}
          height={200} width={200} readOnly={true} />
        <p className="more-info">{moreInfo}</p>
        <p className="updated-at">{updatedAtMessage}</p>
      </div>
    );
  }
}
