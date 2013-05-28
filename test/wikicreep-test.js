var wikicreep = require('../lib/wikicreep.js');
var mocha = require('mocha');
var should = require('should');

describe('ArticleContent', function() {

	var content;
	this.timeout(50000);

	before(function (done) {

		wikicreep.text("Shaquille O'Neal", function (err, data){
			content = data;
			done();
		});
	});		

	it('should have a title ', function () {
		content.should.have.property('title', content.title);
	});
	
	it('should have a text which does not include a redirect', function () {
		content.text.should.not.include('REDIRECT');	
	});

	describe('with text property', function () {

		it('should find the first paragraph and extract the text', function() {
			content.text.should.not.be.empty;
		});
		
		it('the text should not include listen', function () {
			content.text.should.not.include('listen');
		});

		it('should have a last char equal to a dot', function () {
			content.text[content.text.length - 1].should.be.equal(".");
		});
	});
});

describe('ReadyQuery', function() {
	var whiteSpace, underline, titlecase;
	before(function (done) {
		whitespace = wikicreep.readyQuery(" helloworld ");	
		underline = wikicreep.readyQuery("hello world");
		titlecase = wikicreep.readyQuery("hello great world");
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
	this.timeout(40000);
	before(function (done){
		wikicreep.links('Barack Obama', function (err, data){
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

describe('ArticleCategories', function () {
	var categories;
	this.timeout(40000);
	before(function (done) {
		wikicreep.categories("Albert Einstein", function (err, data) {
			categories = data;
			done();
		});
	});	
	it('should return an array which is not empty', function () {
		categories.should.not.be.empty;
	});

});	