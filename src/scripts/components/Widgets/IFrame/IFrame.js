import React, { PropTypes as T } from 'react';
import Widget from '../Widget';

export default class IFrame extends Widget {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        url: props.url
      }
    };
  }

  render() {
    const { url } = this.state.data;

    return (
      <div className="widget widget-iframe">
        <iframe src={url} frameborder={0}></iframe>
      </div>
    );
  }
}
