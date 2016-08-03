import React, { PropTypes as T } from 'react';
import Widget from '../Widget';
import classnames from 'classnames';

export default class Number extends Widget {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: props.title,
        current: props.current,
        moreInfo: props.moreInfo,
        updatedAt: props.updatedAt,
        last: props.last
      },
    };

    this.arrow = this.arrow.bind(this);
  }

  difference() {
    let { current, last } = this.state.data;
    current = parseInt(current);
    if (last) {
      last = parseInt(last);

      if (last != 0) {
        const diff = Math.abs(Math.round((current - last) / last * 100))
        return `${diff}%`;
      }
    }

    return null
  }

  arrow() {
    const { current, last } = this.state.data;
    if (last) {
      if (parseInt(current) > parseInt(last)) {
        return 'fa fa-arrow-up'
      } else {
        return 'fa fa-arrow-down'
      }
    }

    return null
  }

  render() {
    const { title, current, moreInfo, updatedAt, status } = this.state.data;
    const difference = this.difference();
    const arrow = this.arrow();

    let styles = {
      'fa fa-arrow-up': false,
      'fa fa-arrow-down': false,
    };

    if (this.state.data.status) {
      styles[`status-${status}`] = true;
    }

    if (arrow) {
      styles[arrow] = true;
    }

    return (
      <div className="widget widget-number">
        <h1 className="title">{ title }</h1>
        <h2 className="value">{ current }</h2>
        <p className="change-rate">
          <i className={classnames(styles)}></i><span>{ difference }</span>
        </p>
        <p className="more-info">{ moreInfo }</p>
        <p className="upated-at">{ this.updatedAtMessage }</p>
      </div>
    );
  }
}
