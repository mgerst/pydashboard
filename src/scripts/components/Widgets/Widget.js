import React, { PropTypes as T } from 'react';
import SocketService from '../../services/SocketService';

export const widgets = new Map;

export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    const { id } = props;

    // Keep track of widgets
    if (widgets.has(id)) {
      console.error(`Added duplicate widget with id ${id}.`);
    }
    widgets.set(id, this);
    this.id = id;

    // Bind Functions
    this.onUpdate = this.onUpdate.bind(this);

    // Register Listeners
    SocketService.on(`update_widget-${id}`, this.onUpdate);
  }

  componentWillUnmount() {
    widgets.delete(this.id);
  }

  onUpdate() {
    const widgetData = SocketService.getWidgetData(this.id);
    const newData = Object.assign(this.state.data, widgetData);
    this.setState({data: newData})
    // Default Implementation
  }

  get updatedAtMessage() {
    if (this.state.data.updatedAt) {
      const timestamp = new Date(this.state.data.updatedAt * 1000);
      const hours = timestamp.getHours();
      const minutes = ("0" + timestamp.getMinutes()).slice(-2);
      return `Last updated at ${hours}:${minutes}`
    }
  }
}

Widget.propTypes = {
  id: T.string.isRequired,
  row: T.number.isRequired,
  col: T.number.isRequired,
  sizeX: T.number,
  sizeY: T.number,
}

Widget.defaultProps = {
  sizeX: 1,
  sizeY: 1,
}
