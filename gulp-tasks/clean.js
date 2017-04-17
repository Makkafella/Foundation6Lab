module.exports = function (gulp, plugins, config) {
	return function () {
    plugins.del([env.destination.dir + '**/*']);
  };
};
