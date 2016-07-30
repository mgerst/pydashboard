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

  onUpdate() {
    this.setState({data: SocketService.getWidgetData(this.id)})
    // Default Implementation
  }
}

Widget.propTypes = {
  id: T.string.isRequired,
}