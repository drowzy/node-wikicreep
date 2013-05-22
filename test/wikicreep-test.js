var wikicreep = require('../libs/wikicreep.js');
var mocha = require('mocha');
var should = require('should');

describe('ArticleContent', function(){
	var content;
	before(function(done) {
		wikicreep.ArticleContent('Barack Obama', function(err, data){
			content = data.parse;
			done();
		});
	});		
	it('should have a property title ', function() {
		content.should.have.property('title','Barack Obama');
	});
});