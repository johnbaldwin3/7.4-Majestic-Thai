var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var ThaiMainContainer = require('./thai_comp.jsx').ThaiMainContainer;
var models = require('../models/thai_models.js');
var guestOrderCollection = new models.FoodItemCollection();

var ThaiAdminContainer = React.createClass({
  getInitialState: function() {
    var self = this;
    var orders = new models.OrderCollection();

    orders.fetch().then(function(food){
      self.setState({collection: orders});
    });

    console.log('orders', orders );
    return {
      collection: orders
    };

  },
  componentWillMount: function() {
    //console.log('tsc', this.state.collection);
  //  console.log('state of gOC' ,this.state.guestOrderCollection);
  //  var guestOrders = this.state.guestOrderCollection;
  // //  console.log('gOrders', guestOrders);
  //   //var guestOrdersToJSON = guestOrders.toJSON();
  //   console.log('gTJ', guestOrdersToJSON);
  //   var self = this;
  //   this.state.guestOrderCollection.fetch().done(function(){
  //     self.setState({guestOrderCollection: guestOrderCollection});
  //
  //     self.forceUpdate();
  //   });
  },
  deleteOrderItem: function(deletedItem) {
    // var orderCollection = this.state.guestOrderCollection;
    // deletedItem.destroy();
    // this.forceUpdate();
    // var subTotal = orderCollection.subTotal();
    // orderCollection.subTotal();
    // this.setState({ subTotal : subTotal });
  },
  render: function(){
    var self = this;
    var orderFormList = this.state.collection.map(function(order) {
      return (
        <tr key={order.cid} className="menu-item-cell">
          <td className="order-wrap itemer">
            <div className="item">
              {order.get('title')}
            </div>
          </td>
          <td className="order-wrap pricer">
            <div className="price">
              $ {order.get('price')}
            </div>
          </td>
          <td className="order-wrap deleter">
          <button>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      )

    });
    return (
      <div className="order-wrapper-full">
        <div className="table-header">Your Majestic Thai Order:</div>
        <table className="orders table table-striped table-hover">
          <thead className="order">
            <tr>
              <th>Menu Item</th>
              <th>Price</th>
              <th> </th>
            </tr>
          </thead>
          <tbody className="">
            {orderFormList}
            <tr className="success">
              <td>Subtotal:</td>
              <td>$ {this.props.subTotal} </td>
              <td> </td>
            </tr>
          </tbody>
        </table>
        <div className="checkout-div">
            <button type="button" className="btn-danger btn col-xs-12" data-toggle="modal" data-target=".bs-example-modal-lg ">Order Finished</button>
          </div>


        </div>

    )
  }
});

  var AdminViewOrderContainer = React.createClass({

    render: function() {

      return(
        <div></div>
      );
    }
  });

module.exports = {
  ThaiAdminContainer
};
