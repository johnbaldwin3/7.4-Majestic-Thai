var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var ThaiMainContainer = require('./components/thai_comp.jsx').ThaiMainContainer;

var ThaiAppRouter = Backbone.Router.extend({
  routes: {
    '':'index'
  },
  index: function() {
    ReactDOM.render(
      React.createElement(ThaiMainContainer),
      document.getElementById('app')
    );
  }



});

var thaiAppRouter = new ThaiAppRouter();

module.exports = thaiAppRouter;
