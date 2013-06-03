
var $ = require('jquery').create();

var options = {
  start: "http://en.wikipedia.org/w/api.php?action=parse&prop=",
  text: "text&page=",  
  links: "links&page=",
  categories: "categories&page=",
  all: "text|links|categories&page=",
  end: "&format=json&callback=?"
};

/// - Internal functions
function _toTitleCase(toTransform) {
	return toTransform.replace(/^\s+|\s$/g, '').replace(/\b([a-z])/g, function (_, initial) {
  		return initial.toUpperCase();
  });
}

function _readyQuery(query) {
	return _toTitleCase(query).split(' ').join('_');
}

module.exports = { 

  callWikiAPI: function (article, prop ,callback) {
	$.getJSON(options.start + options[prop] + _readyQuery(article) + options.end , function (data) {
	  callback(null, data.parse);
	});		
  },

  parseArticle: function (articleData, callback) {
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
  }
};