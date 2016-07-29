import React from 'react';
import Widget from '../Widget';

import styles from './Text.scss';

export default class Text extends Widget {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      text: props.text,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.title,
      text: props.text,
    });
  }

  render() {
    const { title, text } = this.state;
    const { moreInfo, updatedAt } = this.props;

    return (
      <div className="widget widget-text">
        <h1 className="title">{title}</h1>
        <h3>{text}</h3>
        <p className="more-info">{moreInfo}</p>
        <p className="updated-at">{updatedAt}</p>
      </div>
    );
  }
}
