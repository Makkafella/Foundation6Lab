module.exports = function (gulp, plugins, config, env) {
	return function () {
		var jslibs = config.js.libs.map(function(a) { return config.paths.src.dependencies + a; });
		var jsincludes = config.js.includes.map(function(a) { return config.paths.src.js + a; });
		var alljs = jslibs.concat(jsincludes);
		gulp.src(alljs) // Fetching array from config.json
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.concat(config.js.output))
			.pipe(plugins.insert.prepend('/* Created: ' + env.now + ' */'))
			.pipe(gulp.dest(env.destination.dir + env.destination.js))
			.pipe(plugins.rename({
				suffix: '.min'
			}))
			.pipe(plugins.uglify().on('error', function(error) {
				console.log(error.message);
				this.emit('end');
			}))
			.pipe(plugins.insert.prepend('/* Created: ' + env.now + ' */'))
			.pipe(plugins.sourcemaps.write('maps'))
			.pipe(gulp.dest(env.destination.dir + env.destination.js))
			.pipe(plugins.livereload())
	};
};
