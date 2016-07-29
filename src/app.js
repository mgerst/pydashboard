import React from 'react';
import ReactDOM from 'react-dom';

import Text from './components/Widgets/Text/Text';

import styles from './styles/app.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <Text
          id="fall_text"
          title="ISU Fall CDC"
          text="Starts today"
          moreInfo="At 2pm"
          updatedAt={JSON.stringify(new Date())} />
        <Text
          id="phase_text"
          title="Yet Another"
          text="Attack Phase"
          updatedAt={JSON.stringify(new Date())} />
      </div>
    );
  }
}

const container = document.getElementById('appContainer');
ReactDOM.render(<App />, container);
