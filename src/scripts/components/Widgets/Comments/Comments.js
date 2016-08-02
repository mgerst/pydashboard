import React, { PropTypes as T } from 'react';
import Widget from '../Widget';

export default class Comments extends Widget {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      current_comment: {},
      data: {
        title: props.title,
        comments: props.comments,
        quote: props.quote,
        moreInfo: props.moreInfo,
      }
    };

    this.nextComment = this.nextComment.bind(this);
    this.startCarousel = this.startCarousel.bind(this);

    this.startCarousel();
  }

  startCarousel() {
    setInterval(this.nextComment, 8000);
  }

  nextComment() {
    const { comments } = this.state.data;
    let { cur_idx } = this.state;

    if (comments) {
      cur_idx = (cur_idx + 1) % comments.length;
      this.setState({
        currentIndex: cur_idx,
        current_comment: comments[cur_idx]
      });
    }
  }

  renderWidget() {
    const { title, moreInfo } = this.state.data;
    const { current_comment } = this.state;
    const { quote } = current_comment;

    return (
      <div className="widget widget-comments">
        <h1 className="title">{ title }</h1>

        <div className="comment-container">
          <h3><img src={current_comment.avatar} /><span className="name">{current_comment.name}</span></h3>
          <p className="comment">{ quote }</p>
        </div>

        <p className="more-info">{ moreInfo }</p>
      </div>
    );
  }
}
