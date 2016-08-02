import React, { PropTypes as T } from 'react';
import Widget from '../Widget';

export default class Image extends Widget {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        image: props.image
      }
    };
  }

  renderWidget() {
    const { image } = this.state.data;

    return (
      <div className="widget widget-image">
        <img src={image} />
      </div>
    );
  }
}
