
var $ = require('jquery').create();

var options = {
	type: { page: "page", titles: "titles" },
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

var CallWikiAPI = function (args, callback) {
	$.getJSON('http://en.wikipedia.org/w/api.php?action=' + args + '&format=json&callback=?', function(data) {
		data.parse ? callback(null, data.parse) : callback(null, data.query);
	});		
};

var parseArticle = function(articleData, callback) {
	var data = $("<div>" + articleData.text['*'] + "</div>");
	var redirect = data.find('li:contains("REDIRECT") a').text();

	if(redirect != '') {
    	callWikiApi(redirect, callback); 
        return;
    }

	var content = {};
	content.text = data.find('p').first().text().replace('( listen); ','');
	content.title = articleData.title; 
	callback(null, content);
};

var getAll = function(articleData, callback) {
	var content;
	parseArticle(articleData, function (err, data) {
		content = data; 
		content.links = articleData.links;
		var categories = [];
		var i = 0;
		while(i < data.categories.length - 1) {
			categories[i] = data.categories[i]['*'];
			i++;
		}
		content.categories = categories;
		callback(null, content);
	});	
};
	
exports.readyQuery = function(query) {
	return toTitleCase(query).split(' ').join('_');
};

exports.ContentFromChildren = function (hrefs) {

};

exports.all = function(article, callback) {
	var args = options.action.parse + '&' + "prop=" + options.prop.text + '|'
	+ options.prop.links + '|' + options.prop.categories
	+ "&" + options.type.page +'=' + this.readyQuery(article);

	CallWikiAPI(args, function(err, data) {
		if(err) {
			console.log(err);	
			callback(err);
		}
		else {
			getAll(data, callback);	
		}
	});
};

exports.text = function (article, callback) {
	var args = options.action.parse + '&' + "prop=" + options.prop.text + "&" + options.type.page +'=' + this.readyQuery(article);  
	CallWikiAPI(args, function (err, data){
		if(err) {
			console.log(err);
			callback(err);
		}
		else {
			parseArticle(data, callback);	
		}
	});
};

exports.links = function (article, callback) {
	var args = options.action.parse + '&' + "prop=" + options.prop.links + "&" + options.type.page +'=' + this.readyQuery(article);  
	CallWikiAPI(args, function (err, data) {
		if(err) {
			console.log(err);
			callback(err);
		} else {
			callback(null, data.links);	
		}
	});
};
// http://en.wikipedia.org/w/api.php?action=query&titles=Albert_Einstein&prop=catagories&format=json&callback=?
//fix order
exports.categories = function(article, callback) {
	var args = options.action.parse + "&prop=" + options.prop.categories +'&' + options.type.page + "=" + this.readyQuery(article);
	CallWikiAPI(args, function (err, data) {
		if(err) {
			console.log(err);
			callback(err);
		}	
		else {
			var categories = [];
			var i = 0;
			while(i < data.categories.length - 1) {
				categories[i] = data.categories[i]['*'];
				i++;
			}
			callback(null, categories);
		}
	});
};
