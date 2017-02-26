var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var moment = require('moment');
//require('react-boostrap');
//collection for order should have subtotal, get price, etc...

var models = require('../models/thai_models.js');


var ThaiMainContainer = React.createClass({
  getInitialState: function(){
    var foodItemCollection = new models.FoodItemCollection();
    var orderedItemCollection = new models.CartCollection();
    orderedItemCollection.fetch();
    return {
      foodItemCollection: foodItemCollection,
      orderedItemCollection: orderedItemCollection,
      //orderItem: new models.FoodItemModel(),
    };
  },
  componentWillMount: function() {
    var newFoodCollection = this.state.foodItemCollection;
    newFoodCollection.add([
      {popular: true , type: 'appetizer', menuNumber: 1 , title:"Fried Egg Rolls", price: 3.75 , description:"Mixed vegetables and glass noodles wrapped in rice paper, served with a sweet and sour sauce."},
      {popular: false , type: 'appetizer', menuNumber: 2 , title:"Fresh Rolls", price: 3.50, description:"Vegetables, tofu and noodles wrapped in steamed rice paper served with a sweet & sour sauce."},
      {popular: false, type: 'appetizer', menuNumber: 3 , title:"Fried Tofu", price: 4.50 , description:"Crispy tofu served with a sweet and sour sauce with ground peanuts."},
      {popular: true , type: 'appetizer', menuNumber: 4 , title:"Chicken Satay", price: 6.00 , description:"Grilled marinated chicken on skewers served with a peanut sauce and cucumber salad."},
      {popular: false , type: 'appetizer', menuNumber: 5 , title:"Shrimp Wonton", price: 6.00 , description:"Deep fried shrimp wrapped by wonton skin served with a sweet and sour sauce."},
      {popular: true , type: 'appetizer', menuNumber: 6 , title:"Golden Squid", price: 6.00 , description:"Crispy Golden Fried Squid, served with spicy chili peanut sauce"},{popular: true , type: 'soup', menuNumber: 7 , title:"Tom-Ka Gai", price: 4.95 , description:"A combination of chicken, lemon grass, lime juice, cilantro, red onion, and mushroom in coconut milk blended with special broth."},
      {popular: false , type: 'soup', menuNumber: 8 , title:"Tom-Yum Talae", price: 7.95 , description:"Thai spicy seafood soup with lemon grass, lime juice, chili paste, sweet basil, cilantro, red onion and mushroom."},
      {popular: false , type: 'soup', menuNumber: 9 , title:"Tom-Yum Gai", price: 6.95 , description:"Thai signature spicy soup with chicken, lemon grass, lime juice, chili paste, cilantro, red onion and mushroom in shrimp broth."},
      {popular: true , type: 'entree', menuNumber:10 , title:"Pad Thai", price:10.95 , description:"Classic stir-fried rice noodle with egg, green onion, bean sprout and side of crushed peanut and lime in special Pad Thai sauce."},
      {popular: false , type: 'entree', menuNumber:11 , title:"Pad See-U", price:10.95 , description:"Stir-fried broad noodle with egg, broccoli and carrot in delicious sweet-garlic sauce."},
      {popular: false, type: 'entree', menuNumber: 12 , title:"Pad Kee-Mao", price: 11.95 , description:" Stir-fried broad noodles with egg, sweet basil, fresh chili, garlic, green bean, onion, tomato and red/green bell pepper."},
      {popular: true, type: 'entree', menuNumber: 13 , title:"Thai noodle soup", price: 10.95 , description:"Thai style rice noodle soup in flavored broth with fried garlic, scallion, bean sprout and cilantro."},
      {popular: false, type: 'entree', menuNumber: 14 , title:"Pineapple Fried Rice", price: 11.95 , description:"Special fried rice stir-fried with pineapple, raisin, cashew nut, onion, green pea, tomato, and Thai curry powder."},
      {popular: true, type: 'entree', menuNumber: 15 , title:"Yellow Curry", price: 11.95 , description:"Thai yellow curry cooked in cream of coconut with potato, sweet potato, pineapple and onion"},
      {popular: false , type: 'entree', menuNumber: 16 , title:"Panang Curry", price: 11.95, description:"Special Panang curry paste cooked in cream of coconut with broccoli, zucchini, carrot, baby corn and snow pea."},
      {popular: true , type: 'entree', menuNumber: 17 , title:"Green Curry", price: 11.95 , description:"Sweet & Spicy green curry paste in cream of coconut with sweet basil, bamboo shoot, zucchini, green pea, snow pea, baby corn and eggplant."},
      {popular: true , type: 'entree', menuNumber:18 , title:"Gang Ped Yang", price: 16.95 , description:"Semi-crispy duck cooked in red curry sauce bamboo shoot, sweet basil, bell pepper, tomato, green bean, baby corn, green bean, eggplant and pineapple."},
      {popular: true , type: 'entree', menuNumber: 19 , title:"Garlic Soft Shell Crab ", price: 19.95 , description:"(2) whole soft shell crab, lightly battered and deep-fried, topped with stir-fried garlic and pepper sauce along with broccoli, carrot, zucchini, onion, snow pea, and baby corn"}
    ]);
    var subTotal = this.state.orderedItemCollection.subTotal();
    this.setState({foodItemCollection: newFoodCollection, subTotal : subTotal});
  },
  handleOrder: function(menuItemToOrder){
    var orderCollection = this.state.orderedItemCollection;
    var orderedItem = menuItemToOrder.toJSON();
    var self = this;
    orderCollection.create(orderedItem);
    var subTotal = orderCollection.subTotal();
    //console.log('sub',subTotal);
    this.setState({ subTotal : subTotal });
    self.forceUpdate();
  },
  deleteOrderItem: function(deletedItem) {
    var orderCollection = this.state.orderedItemCollection;
    deletedItem.destroy();
    this.forceUpdate();
    var subTotal = orderCollection.subTotal();
    orderCollection.subTotal();
    this.setState({ subTotal : subTotal });
  },
  handleCheckout: function(completeOrder) {
    var orderCollection = this.state.orderedItemCollection;
    var orderedStuffCheckout = completeOrder.toJSON();
    var orderItemModel = new models.OrderItem();
    var guestName = this.state.guest;
    orderItemModel.set({
      'guest': completeOrder.guest,
      'total': completeOrder.subTotal,
      'order': orderedStuffCheckout,
      'time' : moment().format('LTS'),
    });
    var customerOrderCollection = new models.OrderCollection();
    customerOrderCollection.create(orderItemModel);
    this.setState({customerOrderCollection: orderItemModel, guest: guestName});
    this.forceUpdate();
    this.state.orderedItemCollection.reset([]);
    this.state.subTotal = 0.00;
    console.log(customerOrderCollection, 'COC');
  },
  subOrderButton: function(event) {
    var customerOrderCollection = this.state.orderedItemCollection;
    customerOrderCollection.guest = event.target.value;
    this.setState({customerOrderCollection: customerOrderCollection});
    this.forceUpdate();
  },
  render: function(){
    return(
      <div className="app-wrapper">

        <div className="container-fluid head-nav">

            <div className="header-title col-xs-11">Majestic Thai
            </div>
            <div className="admin-btn col-xs-1">
              <button id="admin-button"><a className="admin-link" href="#admin">Admin Login</a></button>
            </div>

        </div>
        <ThaiModalOrderForm
          subOrderButton={this.subOrderButton}
          handleCustomer={this.handleCustomer}
          handleCheckout={this.handleCheckout}
          subTotal={this.state.subTotal}
          deleteOrderItem={this.deleteOrderItem} orderedItemCollection={this.state.orderedItemCollection}/>


      <div className="container">
        <div className="col-sm-12">
          <div className="row">

            <ThaiMenuList handleOrder={this.handleOrder} foodItemCollection={this.state.foodItemCollection}/>

          <div className="col-sm-4 your-order-list">

            <ThaiOrderForm
              handleCheckout={this.handleCheckout}
              subTotal={this.state.subTotal}
              deleteOrderItem={this.deleteOrderItem} orderedItemCollection={this.state.orderedItemCollection}/>

          </div>
        </div>
      </div>
    </div>
    <footer>Thank You For Visiting Majestic Thai! สนุก!</footer>
  </div>
    )
  }

});

var ThaiModalOrderForm = React.createClass({
  getInitialState: function() {
    var orderedItemCollection1 = new models.FoodItemCollection();
    var self = this;

    orderedItemCollection1.fetch().done(function(){
      self.setState({orderedItemCollection: orderedItemCollection1});

      self.forceUpdate();
    });
    return {
      orderedItemCollection: orderedItemCollection1
    };
  },
  subOrderButton: function(event) {
  this.setState({'guest': event.target.value});
  },
  render: function() {
    var self = this;
    var orderFormListModal = this.props.orderedItemCollection.map(function(order) {
      return (

        <li key={order.cid} className="menu-item-cell">
          <div className="order-wrap itemer">
            <div className="item">
              {order.get('title')}
            </div>
          </div>
          <div className="order-wrap pricer">
            <div className="price">
              $ {order.get('price').toFixed(2)}
            </div>
          </div>
          <div className="order-wrap deleter">
            <button onClick={(e) => {e.preventDefault(); self.props.deleteOrderItem(order);}} className="delete-button">
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </li>
      )

    });
    return (
      <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Complete Your Order:</h4>
          </div>
          <div className="modal-body">
            <ul>{orderFormListModal}</ul>
            <div>SubTotal: $ {this.props.subTotal}</div>

          </div>
          <div className="modal-footer">

          <label htmlFor="guest">Guest Name: </label>
            <input onChange={this.props.subOrderButton} type="text" className="form-control" id="guest" value={this.state.guest} placeholder="Your Name" required/>
            <button onClick={(e) => {e.preventDefault(); self.props.handleCheckout(this.props.orderedItemCollection);}} className="btn-success btn col-xs-12" data-dismiss="modal"><i className="fa fa-shopping-cart" aria-hidden="true"></i> &nbsp; Complete Checkout</button>
            <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
          </div>

        </div>
      </div>
    </div>
    );
  }

});

var ThaiMenuList = React.createClass({
  propTypes: {
    foodItemCollection: React.PropTypes.instanceOf(Backbone.Collection).isRequired
  },
  render: function(){
    var self = this;
      var menuItemList = this.props.foodItemCollection.map(function(menuItem){
        return (
          <div key={menuItem.cid} className="menu-div">
            {/*<div className="menu-list-title">
              <h2 className="menu-type">{menuItem.get('type')}</h2>
            </div>*/}
            <div className="food-list">
              <div className="name"><h3><span className="menu-num">{menuItem.get('menuNumber')}. </span><span className="menu-title">{menuItem.get('title')}</span></h3>
              </div>
              <div className="description">
                {menuItem.get('description')}
                <div className="price">
                  <button onClick={(e) => {e.preventDefault(); self.props.handleOrder(menuItem);}}  className="order-price btn" value={menuItem.get('price')}>$ {menuItem.get('price').toFixed(2)}</button>
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
              $ {order.get('price').toFixed(2)}
            </div>
          </td>
          <td className="order-wrap deleter">
            <button onClick={(e) => {e.preventDefault(); self.props.deleteOrderItem(order);}} className="delete-button">
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
            <button type="button" className="btn-success btn col-xs-12" data-toggle="modal" data-target=".bs-example-modal-lg "><i className="fa fa-shopping-cart" aria-hidden="true"></i> &nbsp; Proceed to Checkout</button>
          </div>


        </div>

    )
  }
});


module.exports = {
  ThaiMainContainer
};
