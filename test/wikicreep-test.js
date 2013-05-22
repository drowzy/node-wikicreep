var wikicreep = require('../libs/wikicreep.js');
var mocha = require('mocha');
var should = require('should');

describe('ArticleContent', function(){
	var title;
	var text;
	before(function(done) {
		wikicreep.ArticleContent('Barack Obama', function(err, data){
			title = data;
			text = data.text;
			done();
		});
	});		
	it('should have a property title ', function() {
		title.should.have.property('title','Barack Obama');
	});
	
	it('should have a proprety text which does not contain a redirect', function () {
		text['*'].should.not.include('REDIRECT');	
	});

	it('should have a proprety text which contains the same content as title', function() {
		text['*'].should.include(title.title);
	});
});