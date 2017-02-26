var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var ThaiMainContainer = require('./components/thai_comp.jsx').ThaiMainContainer;

var ThaiAdminContainer = require('./components/admin.jsx').ThaiAdminContainer;

var ThaiAppRouter = Backbone.Router.extend({
  routes: {
    '':'index',
    'admin': 'admin'
  },
  index: function() {
    ReactDOM.render(
      React.createElement(ThaiMainContainer),
      document.getElementById('app')
    );
  },
  admin: function() {
    ReactDOM.render(
      React.createElement(ThaiAdminContainer),
      document.getElementById('app')
    )
  }



});

var thaiAppRouter = new ThaiAppRouter();

module.exports = thaiAppRouter;
