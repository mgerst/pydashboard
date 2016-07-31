import React, { PropTypes as T } from 'react';
import SocketService from '../services/SocketService';

export const dashboards = new Map;

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const { id } = props;

    // Keep track of dashboards
    if (dashboards.has(id)) {
      console.error(`Added duplicate dashboard with id ${id}.`);
    }
    dashboards.set(id, this);
    this.id = id;

    // Bind Functions
    this.onReload = this.onReload.bind(this);

    // Register Listeners
    SocketService.on(`reload_dashboard-${id}`, this.onReload);
    SocketService.on('reload_dashboards', this.onReload);
  }

  onReload() {
    console.log(`Dashboard ${this.id} reloated`);
    window.location.reload(true);
  }

  render() {
    return (
      <div className="dashboard">
        {this.props.children}
      </div>
    );
  }
}

Dashboard.propTypes = {
  id: T.string.isRequired,
}
