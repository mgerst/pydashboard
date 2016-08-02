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
        y: element.props.row,
        x: element.props.col,
        w: element.props.sizeX,
        h: element.props.sizeY,
      }
    });
    const childComponents = this.props.children.map(element => {
      return <div key={element.props.id} className="gs_w">{element}</div>;
    });

    return (
      <ReactGridLayout className="gridster" layout={layout} isResizeable={false}
        cols={5} rowHeight={360} width={1580}>
        {childComponents}
      </ReactGridLayout>
    );
  }
}

Dashboard.propTypes = {
  id: T.string.isRequired,
}
