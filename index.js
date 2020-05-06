'use strict';

const path = require('path');
const packageFinder = require('@springernature/util-package-finder');
const views = require('koa-views');
const serve = require('koa-static');
const Koa = require('koa');
const app = module.exports = new Koa();

app.use(serve('public'));
app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));

// grab the latest package data & render
app.use(async function (ctx) {
	const response = await packageFinder({versions: true})
	await ctx.render('index', {packages: response});
});

if (!module.parent) {
	app.listen(process.env.PORT || 3000);
	console.log(`Server running at http://localhost:${process.env.PORT || 3000}/`);
}
