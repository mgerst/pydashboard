import React, { PropTypes as T } from 'react';
import SocketService from '../services/SocketService';
import ReactGridLayout from 'react-grid-layout';

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
    const style = {
      fontSize: '12px'
    }
    const location = window.location.hostname;
    const port = window.location.port;

    const layout = this.props.children.map(element => {
      return {
        i: element.props.id,
        x: element.props.row,
        y: element.props.col,
        w: element.props.sizeY,
        h: element.props.sizeX,
      }
    });
    const childComponents = this.props.children.map(element => {
      return <div key={element.props.id}>{element}</div>;
    });

    return (
      <ReactGridLayout className="gridster" layout={layout}
        cols={12} rowHeight={30} width={1200}>
        {childComponents}
      </ReactGridLayout>
    );
  }
}

Dashboard.propTypes = {
  id: T.string.isRequired,
}
