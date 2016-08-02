import React from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';

import Text from './components/Widgets/Text/Text';
import Clock from './components/Widgets/Clock/Clock';
import Number from './components/Widgets/Number/Number';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  render() {
    return (
      <Dashboard className="gridster" id="test_dashboard">
        <Text
          id="fall_text" title="Really Cool Text"
          text="Starts today"
          moreInfo="At 2pm"
          row={1} col={0}
          updatedAt={JSON.stringify(new Date())} />
        <Clock
          row={1} col={1}
          id="current_time" />
        <Text
          id="test_text" title="Next Cool Text"
          text="Other Text"
          moreInfo="Cool Stuff"
          row={2} col={0} sizeX={2}
          updatedAt={JSON.stringify(new Date())} />
        <Number
          id="test_number" title="Really Cool Number"
          current={5} row={1} col={2} />
      </Dashboard>
    );
  }
}

const container = document.getElementById('appContainer');
ReactDOM.render(<App />, container);
