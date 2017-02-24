var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
//collection for order should have subtotal, get price, etc...

var models = require('../models/thai_models.js');


var ThaiMainContainer = React.createClass({
  getInitialState: function(){
    var foodItemCollection = new models.FoodItemCollection();
    var orderedItemCollection = new models.FoodItemCollection();

    return {
      foodItemCollection: foodItemCollection,
      orderedItemCollection: orderedItemCollection,
      orderItem: new models.FoodItemModel()
    }
  },
  componentWillMount: function() {
    var newFoodCollection = this.state.foodItemCollection;

    newFoodCollection.add([
      {popular: true, type: 'appetizer', menuNumber: 1, title:"Crab Nachos", price: 12.99, description:"House made fresh flour and corn chips with olives, tomatoes, diced red onion, fresh picked lump and claw crabmeat, creamy pepperjack fondue and mixed cheeses"},
      {popular: false, type: 'appetizer', menuNumber: 2, title:"Pimento Cheese Fondue", price: 8.99, description:"Hand-cut seasoned potato chips, with our house made pimento Cheese Fondue served warm for dipping"},
      {popular: true, type: 'appetizer', menuNumber: 3, title:"Ahi Spring Rolls", price: 11.99, description:"Fresh Handrolled Spring Rolls with Seared Ahi Tuna, Asian Slaw, and Soy and Wasabi Mayo Sauces"}
    ]);

    this.setState({foodItemCollection: newFoodCollection});
  },
  handleOrder: function(menuItemToOrder){
    var orderCollection = this.state.orderedItemCollection;
    var orderedItem = menuItemToOrder.toJSON();
    //console.log('order', orderedItem);
    //console.log('orders', orderCollection);
    orderCollection.add(orderedItem);
    this.setState({orderedItemCollection: orderCollection});

    //this.setState({orderItem: orderedItem});
    //orders.add(orderedItem);
    //this.setState({orderedItemCollection: orderedItemCollection});
    console.log('orderCollect', this.state.orderedItemCollection );

  },
  deleteOrderItem: function(deletedItem) {
    console.log('click-delete-contain', deletedItem);
  },
  render: function(){
        //console.log(this.state.foodItemCollection);
    return(
      <div className="app-wrapper">
      <div className="inner-wrapper">
        <div className="container-fluid">
          <header><h1 className="header-title">Majestic Thai</h1></header>
        </div>
      </div>
      <div className="container">
        <div className="col-sm-12">
          <div className="row">

              <ThaiMenuList handleOrder={this.handleOrder} foodItemCollection={this.state.foodItemCollection}/>

            <div className="col-sm-4 your-order-list">

              <ThaiOrderForm deleteOrderItem={this.deleteOrderItem} orderedItemCollection={this.state.orderedItemCollection}/>

            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

});

var ThaiMenuList = React.createClass({
  propTypes: {
    foodItemCollection: React.PropTypes.instanceOf(Backbone.Collection).isRequired
  // }
  // // ,
  // // handleOrder: function(event){
  // //     event.preventDefault();
  // //     console.log('my order $', event.target.value);
  // //     return (event.target.value);
  },
  render: function(){
    var self = this;
      var menuItemList = this.props.foodItemCollection.map(function(menuItem){
        return (
          <div key={menuItem.cid} className="menu-div">
            <div className="menu-list-title">
              <h2 className="menu-type">{menuItem.get('type')}</h2>
            </div>
            <div className="food-list">
              <div className="name"><h3><span className="menu-num">{menuItem.get('menuNumber')}. </span><span className="menu-title">{menuItem.get('title')}</span></h3></div>
              <div className="description">
                {menuItem.get('description')}
                <div className="price">
                  <button onClick={(e) => {e.preventDefault(); self.props.handleOrder(menuItem);}}  className="order-price btn" value={menuItem.get('price')}>$ {menuItem.get('price')}</button>
                </div>
              </div>
            </div>
          </div>
        )
      })
    return (
      <div className="col-sm-8 menu-list-row">
        {menuItemList}
      </div>
    )
  }
});

var ThaiOrderForm = React.createClass({
  // deleteOrderItem: function(){
  //   return console.log('click-delete-form');
  // },
  render: function(){
    var self = this;
    var orderFormList = this.props.orderedItemCollection.map(function(order) {
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
              <button onClick={(e) => {e.preventDefault(); self.props.deleteOrderItem(order);}} className="delete-button"><i className="fa fa-times" aria-hidden="true"></i></button>
          </td>

        </tr>
      )

    });
    return (
      <div className="order-wrapper-full">
        <table className="orders table table-striped table-hover">
          <thead className="order">
            <tr className="table-header">Your Majestic Thai Order:</tr>
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
              <td>XXX</td>
              <td> </td>
            </tr>
          </tbody>
        </table>
        <div className="checkout-div">
          <button className="btn-success btn">Proceed to Checkout</button>
        </div>
      </div>
    )
  }
});


module.exports = {
  ThaiMainContainer
};
