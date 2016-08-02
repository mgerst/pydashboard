import React from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';

import Text from './components/Widgets/Text/Text';
import Clock from './components/Widgets/Clock/Clock';
import Dashboard from './components/Dashboard';


class App extends React.Component {
  render() {
    return (
      <Dashboard className="gridster" id="test_dashboard">
        <Text
          id="fall_text" title="Really Cool Text"
          text="Starts today"
          moreInfo="At 2pm"
          row={0} col={0}
          updatedAt={JSON.stringify(new Date())} />
        <Clock
          row={1} col={1}
          id="current_time" />
      </Dashboard>
    );
  }
}

const container = document.getElementById('appContainer');
ReactDOM.render(<App />, container);
