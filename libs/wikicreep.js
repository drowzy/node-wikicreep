
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

var ReadyQuery = function(query) {
	return query.replace(/^\s+|\s$/g, '').replace(' ','_');
};

exports.ContentFromChildren = function (hrefs) {

};

var CallWikiAPI = function (callback) {
	request(options, function(err, response, body) {
		if(err) {
			console.log(err);
			callback(err, null);
		} else {
			callback(null, body.parse);	
		}
	});
};

exports.ArticleContent = function (article, callback) {
	console.log("ArticleContent for: " + article);
	options.uri = URI + wikiOpt.text + ReadyQuery(article) + wikiOpt.format.json;
	CallWikiAPI(callback);
	
};
//TODO
exports.ArticleLinks = function (article, sortType, limit, callback) {
	options.path = orgPath + wikiOpt.links + ReadyQuery(article) + wikiOpt.format.json;
	CallWikiAPI(function (err, data) {
		if(err) {
			console.log(err);
		} else {
			callback(null, data.links)
		}
	});
};


