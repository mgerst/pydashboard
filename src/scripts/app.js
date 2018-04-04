import React from 'react';
import ReactDOM from 'react-dom';

import Text from './components/Widgets/Text/Text';
import Dashboard from './components/Dashboard';
import DashboardManager from './DashboardManager';
import socketService from './services/SocketService';

class App extends React.Component {
    render() {
        const container = document.getElementById('appContainer');
        const dashboard_id = container.dataset.dashboardId;

        const DB = DashboardManager.getDashboard(dashboard_id);
        if (DB == null || DB == undefined) {
            console.warn(`Unknown dashboard: ${dashboard_id}`);
            return (
                <Dashboard className="gridster" id="no_dashboard">
                    <Text id="not_found" title="Dashboard Not Found"
                          row={1} col={0} sizeX={5} sizeY={2}/>
                </Dashboard>
            );
        }
        return (
            <DB/>
        );
    }
}

const container = document.getElementById('appContainer');
ReactDOM.render(<App/>, container);
