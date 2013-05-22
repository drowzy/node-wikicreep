
var request = require('request');
var URI = 'http://en.wikipedia.org/w/api.php?action=parse&prop='; 
var options = {
	uri: '',
	method: 'GET',
	followRedirect: true,
	json: true,
	maxRedirects: 10
};

var wikiOpt = {
	text: 'text&page=',
	links: 'links&page=',
	images: 'links&page=',
	format: { json: '&format=json', xml: '&format=xml' }
};

var Arrange = function (data, sortType, limit) {

};
var toTitleCase = function(toTransform) {
	return toTransform.replace(/^\s+|\s$/g, '').replace(/\b([a-z])/g, function (_, initial) {
  		return initial.toUpperCase();
  });
};

exports.ReadyQuery = function(query) {
	return toTitleCase(query).split(' ').join('_');
};

exports.ContentFromChildren = function (hrefs) {

};

var CallWikiAPI = function (callback) {
	request(options, function(err, response, body) {
		if(err) {
			console.log(err);
			callback(err);
		} else {
			callback(null, body.parse);	
		}
	});
};

exports.ArticleContent = function (article, callback) {
	console.log("ArticleContent for: " + article);
	options.uri = URI + wikiOpt.text + this.ReadyQuery(article) + wikiOpt.format.json;
	CallWikiAPI(callback);
	
};
//TODO
exports.ArticleLinks = function (article, sortType, limit, callback) {
	options.path = orgPath + wikiOpt.links + ReadyQuery(article) + wikiOpt.format.json;
	CallWikiAPI(function (err, data) {
		if(err) {
			console.log(err);
			callback(err);
		} else {
			callback(null, data.links)
		}
	});
};


