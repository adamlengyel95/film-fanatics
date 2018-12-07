import React, { Component } from 'react';
import Test from '../src/components/test/Test';

class App extends Component {
  render() {
    return (
      <div>
        <p>Hello from React!</p>
        <p>Here comes some data from the server...</p>
        <Test />
      </div>
    );
  }
}

export default App;
