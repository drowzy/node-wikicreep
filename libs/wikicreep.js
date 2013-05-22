
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
	format: { json: '&format=json', xml: '&format=xml' }
};

var Arrange = function (data, sortType, limit) {

};

var ReadyQuery = function(query) {
	return query.replace(/^\s+|\s$/g, '').replace(' ','_');
};

exports.ContentFromChildren = function (hrefs) {

};

exports.ArticleContent = function (article, callback) {
	console.log("ArticleContent for: " + article);
	options.uri = URI + wikiOpt.text + ReadyQuery(article) + wikiOpt.format.json;
	request(options, function(err, response, body) {
		if(err) {
			console.log(err);
			callback(err, null);
		}
		else {
			console.log("request complete");
			callback(null, body);	
		}
	});
};
//TODO
exports.ArticleChildren = function (article, sortType, limit) {
	options.path = orgPath + wikiOpt.links + ReadyQuery(article) + wikiOpt.format.json;
};


