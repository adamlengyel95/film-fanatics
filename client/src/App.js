import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Layout} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
