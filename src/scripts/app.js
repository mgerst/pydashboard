import React from 'react';
import ReactDOM from 'react-dom';

import Text from './components/Widgets/Text/Text';
import Clock from './components/Widgets/Clock/Clock';

class App extends React.Component {
  render() {
    return (
      <div>
        <Text
          id="fall_text"
          title="Really Cool Text"
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
