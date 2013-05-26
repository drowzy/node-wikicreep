
var request = require('request');
var $ = require('jquery').create();
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

var CallWikiAPI = function (article, prop, callback) {
	console.log("Calling Wikipedia Api");
	$.getJSON('http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?', {page:article, prop:prop, uselang:'en'}, function(data) {
		callback(null, data.parse);
	});		
};

var parseArticle = function(articleData, limit, callback) {
	var content = {};
	var data = $("<div>" + articleData.text['*'] + "</div>").find('p').first().text();
	console.log(data);
	content.title = articleData.title; 
	//content.text = data.substring(0,data.indexOf('.') + 1).replace('( listen); ','');	
	console.log(content.text);
	callback(null, content);

};

exports.ReadyQuery = function(query) {
	return toTitleCase(query).split(' ').join('_');
};

exports.ContentFromChildren = function (hrefs) {

};

exports.ArticleContent = function (article, callback) {
	console.log("ArticleContent for: " + article);
	CallWikiAPI(this.ReadyQuery(article), "text|images", function (err, data){
		if(err) {
			console.log(err);
			throw err;
		}
		else {
			console.log("Parssing Data");
			parseArticle(data,null,callback);	
		}
	});
};

exports.ArticleLinks = function (article, sortType, limit, callback) {
	CallWikiAPI(this.ReadyQuery(article), "links", function (err, data) {
		if(err) {
			console.log(err);
			callback(err);
		} else {
			callback(null, data.links)
		}
	});
};
