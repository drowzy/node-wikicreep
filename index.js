var wiki = require('./lib/wikicreep.js');
var util = require('./lib/util.js');

module.exports= {
	all: wiki.all,
	text: wiki.text,
	links: wiki.links,
	categories: wiki.categories,
	parseArticle: util.parseArticle	
};
