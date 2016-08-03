import React from 'react';

import DashboardManager from '../src/scripts/DashboardManager';

import Text from '../src/scripts/components/Widgets/Text/Text';
import Number from '../src/scripts/components/Widgets/Number/Number';
import Dashboard from '../src/scripts/components/Dashboard';

class IndexDashboard extends React.Component {
  render() {
    return (
      <Dashboard className="gridster" id="index">
        <Text
          id="fall_text" title="Really Cool Text"
          text="Starts today" moreInfo="At 2pm"
          row={1} col={0} />
        <Number
          id="test_number" title="Cool Number"
          current={5} row={1} col={1} />
      </Dashboard>
    );
  }
}

DashboardManager.registerDashboard('index', IndexDashboard);
