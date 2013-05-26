
var request = require('request');
var $ = require('jquery').create();

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
	var data = $("<div>" + articleData.text['*'] + "</div>");
	var redirect = data.find('li:contains("REDIRECT") a').text();

	if(redirect != '') {
     callWikiApi(redirect);
        return;
    }

	var content = {};
	content.text = data.find('p').first().text().replace('( listen); ','');
	content.title = articleData.title; 
	callback(null, content);
};

exports.ReadyQuery = function(query) {
	return toTitleCase(query).split(' ').join('_');
};

exports.ContentFromChildren = function (hrefs) {

};

exports.ArticleContent = function (article, limit, callback) {
	console.log("ArticleContent for: " + article);
	CallWikiAPI(this.ReadyQuery(article), "text|images", function (err, data){
		if(err) {
			console.log(err);
			throw err;
		}
		else {
			console.log("Parssing Data");
			parseArticle(data,limit,callback);	
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
