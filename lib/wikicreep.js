
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
	console.log("Calling Wikipedia Api");
		$.getJSON('http://en.wikipedia.org/w/api.php?action=' + args + '&format=json&callback=?', function(data) {
		if(data.parse) {
			callback(null, data.parse);
		}
		else {
			console.log(data);
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
	callback(null, content);
};

exports.ReadyQuery = function(query) {
	return toTitleCase(query).split(' ').join('_');
};

exports.ContentFromChildren = function (hrefs) {

};

exports.ArticleContent = function (article, callback) {
	var args = options.action.parse + '&' + "prop=" + options.prop.text + "&" + options.type.page +'=' + this.ReadyQuery(article);  
	CallWikiAPI(args, function (err, data){
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
	var args = options.action.parse + '&' + "prop=" + options.prop.links + "&" + options.type.page +'=' + this.ReadyQuery(article);  
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
exports.ArticleCategories = function(article, callback) {
	var args = options.action.parse + "&prop=" + options.prop.categories +'&' + options.type.page + "=" + this.ReadyQuery(article);
	CallWikiAPI(args, function (err, data) {
		if(err) {
			console.log(err);
			callback(err);
		}	
		else {
			var cat = [];
			console.log(data.categories.length);
			var i = 0;
			while(i < data.categories.length - 1) {
				cat[i] = data.categories[i]['*'];
				i++;
			}

			console.log(cat);	
			callback(null, cat);
		}
	});
};
