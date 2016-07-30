import React from 'react';
import ReactDOM from 'react-dom';

import Text from './components/Widgets/Text/Text';
import Clock from './components/Widgets/Clock/Clock';

//import styles from './styles/app.scss';

class App extends React.Component {
  render() {
    const list = [
      {label: "L1", value: "V1"},
      {label: "L2", value: "V2"},
      {label: "L3", value: "V3"},
    ];

    return (
      <div>
        <Text
          id="fall_text"
          title="ISU Fall CDC"
          text="Starts today"
          moreInfo="At 2pm"
          updatedAt={JSON.stringify(new Date())} />
        <Clock
          id="current_time" />
      </div>
    );
  }
}

const container = document.getElementById('appContainer');
ReactDOM.render(<App />, container);
