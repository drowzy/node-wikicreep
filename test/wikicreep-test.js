var wikicreep = require('../libs/wikicreep.js');
var mocha = require('mocha');
var should = require('should');

describe('ArticleContent', function() {
	var title;
	var text;
	before(function (done) {
		wikicreep.ArticleContent('Barack Obama', function(err, data){
			title = data;
			text = data.text;
			done();
		});
	});		
	it('should have a property title ', function () {
		title.should.have.property('title','Barack Obama');
	});
	
	it('should have a proprety text which does not contain a redirect', function () {
		text['*'].should.not.include('REDIRECT');	
	});

	it('should have a proprety text which contains the same content as title', function() {
		text['*'].should.include(title.title);
	});
});

describe('ReadyQuery', function() {
	var whiteSpace, underline, titlecase;
	before(function (done) {
		whitespace = wikicreep.ReadyQuery(" helloworld ");	
		underline = wikicreep.ReadyQuery("hello world");
		titlecase = wikicreep.ReadyQuery("hello great world");
		done();
	});
	it('should remove whitespace at the begining and end', function(){
		whitespace.should.equal("Helloworld");
	});
	it('should replace whitespace at the midle with underscore', function(){
		underline.should.equal("Hello_World");
	});
	it('should titlecase the string' , function(){
		titlecase.should.equal("Hello_Great_World");
	});
});

describe('ArticleLinks', function () {
	var links;
	before(function (done){
		wikicreep.ArticleLinks('Barack Obama',"","",function (err, data){
			links = data;
			done();
		});
	});
	it('should have link name for each link', function () {
		links[0]['*'].should.include('Obama');
	});
});