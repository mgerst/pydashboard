import React from 'react';
import Widget from '../Widget';

export default class Text extends Widget {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: props.title,
        text: props.text,
        moreInfo: props.moreInfo,
        updatedAt: props.updatedAt,
      },
    };
  }

  render() {
    const { title, text, moreInfo } = this.state.data;
    const updatedAtMessage = this.updatedAtMessage;

    return (
      <div className="widget widget-text">
        <h1 className="title">{title}</h1>
        <h3>{text}</h3>
        <p className="more-info">{moreInfo}</p>
        <p className="updated-at">{updatedAtMessage}</p>
      </div>
    );
  }
}
