module.exports = function (gulp, plugins, config, env) {
	return function () {
		var templateData = {
				dev: env.isDevelopment,
				img: env.destination.img,
				js: env.destination.js,
				dummy: env.destination.dummy,
				css: env.destination.css,
				p_name: config.projectinfo.name
			},
			options = {
				ignorePartials: true,
				batch: config.paths.src.html.partials,
				helpers: {
					times: function (n, block) {
						var accum = '';
						for (var i = 0; i < n; ++i) {
							accum += block.fn(i);
						}
						return accum;
					}
				}
			}
		return gulp.src(config.paths.src.html.pages + '*.html')
			.pipe(plugins.handlebars(templateData, options))
			.pipe(gulp.dest(env.destination.dir + env.destination.html))
			.pipe(plugins.livereload())
	};
};
