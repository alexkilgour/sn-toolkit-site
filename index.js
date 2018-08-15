'use strict';

const path = require('path');
const views = require('koa-views');
const serve = require('koa-static');
const request = require('koa-http-request');
const Koa = require('koa');
const app = module.exports = new Koa();

// dummy data
let data = require('./dummy.json');

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
