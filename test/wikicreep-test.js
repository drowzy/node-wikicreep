var wikicreep = require('../libs/wikicreep.js');
var mocha = require('mocha');
var should = require('should');

describe('ArticleContent', function() {
	var content;
	var text;
	this.timeout(50000);
	before(function (done) {
		wikicreep.ArticleContent("Shaquille O'Neal", function(err, data){
			content = data;
			done();
		});
	});		
	it('should have a property title ', function () {
		content.should.have.property('title', content.title);
	});
	
	it('should the text should not incldue redirect', function () {
		content.text.should.not.include('REDIRECT');	
	});

	describe('with the text property', function () {


		it('should find the first paragraph and extract the text', function() {
			content.text.should.not.be.empty;
		});
		it('should have a last char equal to a dot', function () {
			content.text[content.text.length - 1].should.be.equal(".");
		});
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

	it('should have a namespace of 0 Main/Article', function (){
		links[0].ns.should.equal(0);	
	});
});