var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');
var moment = require('moment');


var FoodItemModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    price: 0,
    qty: 1,
    timestamp: ''

  },
  initialize: function(){
   this.isNew() ? this.set('timestamp', moment().format('LTS')) : this.set('timestamp', this.get('timestamp'));
},
  total: function() {
    return this.get('price') * this.get('qty');

  }
});

var FoodItemCollection = Backbone.Collection.extend({
  model: FoodItemModel,
  url:'https://tiny-lasagna-server.herokuapp.com/collections/jbmenu3/',

});

var OrderItem = Backbone.Model.extend({
  idAttribute:'_id',
  defaults: {
    guest: 'guest',
    total: '',
    order: [],
    time: 'timestamp'

  }

});

var OrderCollection = Backbone.Collection.extend({
  model: OrderItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/jb33menu/'
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
  CartCollection,
  OrderCollection
};
