var Backbone = require('backbone');


var FoodItemModel = Backbone.Model.extend({
  defaults: {
    popular: false,
    type: "edible",
    menuNumber: 1,
    title: "Yummy Food Item",
    price: 10.99,
    description: "you're gonna love it, we do",

  },
  getPrice: function() {
    return this.price;
  }
});

var FoodItemCollection = Backbone.Collection.extend({
  model: FoodItemModel,

});


module.exports = {
  FoodItemModel,
  FoodItemCollection
};
