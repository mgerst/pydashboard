import React from 'react';

import DashboardManager from '../src/scripts/DashboardManager';

import Text from '../src/scripts/components/Widgets/Text/Text';
import Number from '../src/scripts/components/Widgets/Number/Number';
import Dashboard from '../src/scripts/components/Dashboard';

class ServiceDashboard extends React.Component {
  render() {
    return (
      <Dashboard className="gridster" id="iscore">
        <Text id="ito_text" title="Services"
          text="Job Example"
          row={1} col={0} />
        <Number id="services_up" title="Up Services"
          row={1} col={1} />
        <Number id="services_partial" title="Partial services"
          row={1} col={3} />
        <Number id="services_down" title="Down Services"
          row={1} col={2} />
      </Dashboard>
    );
  }
}

DashboardManager.registerDashboard('service', ServiceDashboard);
