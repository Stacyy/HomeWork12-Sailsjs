/**
* Countries.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

   connection: 'someMongodbServer',
  attributes: {
  	name : {
  		type: 'string'
  	},
  	about: {
  		type: 'string'
  	},
  	hotels : {
  		type: 'array'
  	},
  	getAllHotels: function() {
  		return this.hotels;
  	},
  	takeIndex: function(hotelname) {
		return this.hotels
			.map(function(item) { 
					return item.name;
				})
			.indexOf(hotelname);
	}
  }
};

