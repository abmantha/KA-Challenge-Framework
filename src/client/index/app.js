/* app.js - responsible for injecting the ChallengeFramework into the index.ejs view */
var React = require('react');
var ReactDOM = require('react-dom');
var ChallengeFramework = require('./ChallengeFramework.jsx');

React.render(
  <ChallengeFramework />,
  document.getElementById('render-target')
);
