var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');


var FoodItemModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    popular: false,
    type: "edible",
    menuNumber: 1,
    title: "Yummy Food Item",
    price: 10.99,
    description: "you're gonna love it, we do",
    qty: 1

  },
  total: function() {
    return this.get('price') * this.get('qty');

  }
});

var FoodItemCollection = Backbone.Collection.extend({
  model: FoodItemModel,
  url:'https://tiny-lasagna-server.herokuapp.com/collections/jbmenu/',

});

var OrderItem = Backbone.Model.extend({
  idAttribute:'_id',
  defaults: {
    guest: 'guest',
    total: '',
    order: [],
    time: 'timestamp'

  }

})

var CartCollection = Backbone.Collection.extend({
  model: FoodItemModel,
  localStorage: new Backbone.LocalStorage('some-order'),
  // url:'https://tiny-lasagna-server.herokuapp.com/collections/menuorders/',
  subTotal: function() {
      var total = 0;
      this.each(function(model){
        total += (model.total());
      });
      //console.log(total.toFixed(2));
      return total.toFixed(2);
    }
});


module.exports = {
  FoodItemModel,
  FoodItemCollection,
  OrderItem,
  CartCollection
};
