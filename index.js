'use strict';

const path = require('path');
const packageFinder = require('@springernature/util-package-finder');
const views = require('koa-views');
const serve = require('koa-static');
const request = require('koa-http-request');
const Koa = require('koa');
const app = module.exports = new Koa();

let data;

// dummy data
// data = require('./dummy.json');

// grab the latest global package data
packageFinder({filters:['global', 'acme']})
	.then(response => {
		data = {
			packages: response
		};
	});

// app
app.use(serve('public'));
app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));

// render
app.use(async function (ctx) {
	await ctx.render('index', data);
});

if (!module.parent) {
	app.listen(3000);
	console.log('listening on port 3000');
}
