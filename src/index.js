import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from "./Homepage";

React.Component.prototype.$config = window.config
ReactDOM.render(<Homepage />, document.getElementById('root'));