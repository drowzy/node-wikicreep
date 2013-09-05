var util = require("./util.js");

function getAll(articleData, callback) {
  var content;
  parseArticle(articleData, function (err, data) {
    content = data; 
    content.links = articleData.links;
    var categories = [];
  	content.categories = setCategories(data);
  	callback(null, content);
  });	
};
	
function setCategories(data) {
  var categories = [];
  var keys = Object.keys(data.categories); 
  for(var i = 0, length = keys.length; i < length; i++) {
  	categories[i] = data.categories[keys[i]]['*'];
  }
  return categories;
}

function calcSimularity(firstData, secondData, callback) {

}

module.exports = {

  all: function(article, callback) {
    util.CallWikiAPI(args, "all", function (err, data) {
      getAll(data, callback);	
	 });
  },

  text: function(article, callback) {
    util.callWikiAPI(article,"text", callback);
  },

  links: function(article, callback) {
    util.callWikiAPI(article, "links", callback); 
  },

  categories: function(article, callback) {
    util.callWikiAPI(article, "categories", function (err, data) {
      callback(null, setCategories(data));
    });
  },
  simularity: function(firstArticle, secondArticle, callback) {
    var dataFirst;
    util.callWikiAPI(firstArticle, "links", function(err, data) {
      dataFirst = data;  
      util.callWikiAPI(secondArticle, "links", function(err,data) {
        calcSimularity(dataFirst, data);
      });
    }); 
  }

};