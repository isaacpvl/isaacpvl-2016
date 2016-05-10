var gulp = require("gulp"),
	server = require("gulp-express"),
	jade = require("gulp-jade"),
	sass = require("gulp-sass"),
	jshint = require("gulp-jshint"),
	autoprefixer = require("gulp-autoprefixer"),
	plumber = require("gulp-plumber"),
	app = require("./app");

var onError = function(err) {
	err = {
		"Name": err.name,
		"File": err.file,
		"Reason": err.reason,
		"Message": err.message
	}
	console.log(err);
	this.emit("end");
};

gulp.task("sass", function() {
	return gulp.src("src/sass/*.scss")
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sass({
			style: "expanded",
			errLogToConsole: true
		}))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: true
		}))
		.pipe(gulp.dest("public/stylesheets"))
		.pipe(server.notify());
});

gulp.task("lint", function() {
	return gulp.src("src/javascripts/*.js")
		.pipe(plumber({ errorHandler: onError }))
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(gulp.dest("public/javascripts"))
		.pipe(server.notify());
});

gulp.task("templates", function() {
	return gulp.src("views/html/*.jade")
		.pipe(jade({pretty: false}))
    	.pipe(gulp.dest("public/html"))
		.pipe(plumber({ errorHandler: onError }))
		.pipe(server.notify());
});

gulp.task("templates", function() {
	return gulp.src("views/**/*.jade")
		.pipe(jade({pretty: false}))
    	.pipe(gulp.dest("public"))
		.pipe(plumber({ errorHandler: onError }))
		.pipe(server.notify());
});

gulp.task("server", function () {
	server.run(["./bin/www"]);
	gulp.watch("src/sass/**/*.scss", ["sass"]);
	gulp.watch("src/javascripts/**/*.js",["lint"]);
	gulp.watch("views/**/*.jade", ["templates"]);
});

gulp.task("default", ["sass", "lint", "server", "templates"], function() {
});