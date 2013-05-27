
var $ = require('jquery').create();

var options = {
	type: { page: "page", title: "title" },
	action: { parse: "parse", query: "query" },
	prop: { text: "text|images", links: "links", categories: "categories" }
};

var Arrange = function (data, sortType, limit) {

};

var toTitleCase = function(toTransform) {
	return toTransform.replace(/^\s+|\s$/g, '').replace(/\b([a-z])/g, function (_, initial) {
  		return initial.toUpperCase();
  });
};

var CallWikiAPI = function (article, action, prop, type, callback) {
	console.log("Calling Wikipedia Api");
		$.getJSON('http://en.wikipedia.org/w/api.php?action=' + action + '&' + "prop=" + prop + "&" + type +'=' + article + '&format=json&callback=?',{uselang:'en'}, function(data) {
		if(data.parse) {
			console.log("parse" + prop);
			callback(null, data.parse);
		}
		else {
			console.log("query")
			callback(null, data.query); 
		}
	});		
};

var parseArticle = function(articleData, callback) {
	var data = $("<div>" + articleData.text['*'] + "</div>");
	var redirect = data.find('li:contains("REDIRECT") a').text();

	if(redirect != '') {
     callWikiApi(redirect); 
        return;
    }

	var content = {};
	content.text = data.find('p').first().text().replace('( listen); ','');
	content.title = articleData.title; 
	console.log(content.text);
	callback(null, content);
};

exports.ReadyQuery = function(query) {
	return toTitleCase(query).split(' ').join('_');
};

exports.ContentFromChildren = function (hrefs) {

};

exports.ArticleContent = function (article, callback) {
	CallWikiAPI(this.ReadyQuery(article), options.action.parse, options.prop.text, options.type.page, function (err, data){
		if(err) {
			console.log(err);
			throw err;
		}
		else {
			console.log("Parssing Data");
			parseArticle(data, callback);	
		}
	});
};

exports.ArticleLinks = function (article, callback) {
	console.log("doing links");
	CallWikiAPI(this.ReadyQuery(article), options.action.parse, options.prop.links, options.type.page, function (err, data) {
		if(err) {
			console.log(err);
			callback(err);
		} else {
			console.log(data.links);
			callback(null, data.links);	
		}
	});
};
// http://en.wikipedia.org/w/api.php?action=query&titles=Albert_Einstein&prop=catagories&format=json&callback=?
//fix order
exports.ArticleCategories = function(article, callback) {
	CallWikiAPI(this.ReadyQuery(article),options.action.query, options.prop.categories ,options.type.title, function (err, data) {
		if(err) {
			console.log(err);
			callback(err);
		}	
		else {
			console.log("categories");	
			var categories = [];
			for(var prop in data.pages.categories) {
				catgories['*'].push(prop);	
			}
			callback(null, categories);
		}
	})
};
