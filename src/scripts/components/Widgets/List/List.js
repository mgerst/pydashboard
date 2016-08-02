import React, { PropTypes as T } from 'react';
import Widget from '../Widget';

export default class List extends Widget {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: props.title,
        items: props.items,
        moreInfo: props.moreInfo,
        updatedAt: props.updatedAt
      }
    };
  }

  renderWidget() {
    const { title, moreInfo, updatedAt, items } = this.state.data;

    const listItems = items.map((item) => {
      return (
        <li>
          <span className="label">{item.label}</span>
          <span className="value">{item.value}</span>
        </li>
      );
    })

    let list;
    if (this.props.unordered) {
      list = <ul className="list-nostyle">{ listItems }</ul>;
    } else {
      list = <ol>{ listItems }</ol>;
    }

    return (
      <div className="widget widget-list">
        <h1 className="title">{ title }</h1>

        { list }

        <p className="more-info">{ moreInfo }</p>
        <p className="updated-at">{ updatedAt }</p>
      </div>
    );
  }
}

List.defaultProps = {
  unordered: false,
  items: [],
}
