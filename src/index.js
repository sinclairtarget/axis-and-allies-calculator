import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import unitConfig from './lib/unit-config.js';
import simulate from './lib/simulate.js';

ReactDOM.render(<App />, document.getElementById('root'));

let atk = {
  'infantry': 4,
  'tank': 1
};

let def = {
  'infantry': 9
};

let result = simulate(atk, def, unitConfig, 10);
console.log(result);
