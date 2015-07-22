/**
 * CountriesController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	allCountries: function(req, res) {
		Countries.find().exec(function(err, result) {
			return res.send(result);
		});
	},
	addCountry: function(req, res) {
		 var obj = {
            name: req.body.name
        };
        Countries.create(obj).exec(function(err, country){
            return res.send(country);
        });
	},
	hotelsByCountry: function(req, res) {

		var temp = req.param('name');
		console.log('Looking for a hotel:' + temp);
		Countries.findOne({name: temp})
			.exec(function(err, country) {
				res.send(country.getAllHotels());
			});
	},

	addHotel: function(req, res) {
		var temp = req.param('name');
		Countries.findOne({name: temp})
			.exec(function(err, country) {
				var hotel = {
					name: req.body.name,
					about: req.body.about,
				};
				country.getAllHotels().push(hotel);

				country.save(function(err) {
					res.send(country.getAllHotels());
				})
			});
	},

	aboutHotel: function(req, res) {
		var temp = req.param('name');
		Countries.findOne({name: temp})
			.exec(function(err, country) {
				var about = country.getAllHotels().filter(function(item) {
					return item['name'] === req.params.hotelname;
				})[0]['about'];

				res.send({ about: about });
			});
	},

	deleteHotel: function(req, res) {
		var temp = req.param('name');
		Countries.findOne({name: temp})
			.exec(function(err, country) {
	
				var index = country.takeIndex(req.param('hotelname'));
				country.getAllHotels().splice(index, 1);
				country.save(function(err) {
					res.send(country.getAllHotels());
				});
			});
	},

	updateHotel: function(req, res) {
		var temp = req.param('name');
		Countries.findOne({name: temp})
			.exec(function(err, country) {
	
				var index = country.takeIndex(req.param('hotelname'));
				var ourHotel = country.getAllHotels()[index];
				if (req.body.name) ourHotel['name'] = req.body.name;
				if (req.body.about) ourHotel['about'] = req.body.about;
				
			country.save(function(err) {
					res.send(country.getAllHotels());
				});
			});
	},

	badRequest: function(req, res){
		res.view('400',{message:'Error'});
	},

	error404: function(req, res){
		res.send( "Not Found" );
	},

	error400: function(req, res){
		res.send('Error 400.  Bad Request.');
	}

};

