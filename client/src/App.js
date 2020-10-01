import React from 'react';
import { Helmet } from 'react-helmet';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'jquery';
import 'popper.js'

import Edison from './components/Edison'

function App() {
  return (
    <div className="App row justify-content-center align-items-center unselectable">
      <Helmet>
        <style>{"body{ background-color: #282c34;}"}</style>
      </Helmet>
      <Edison />
    </div>
  );
}

export default App;
