"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
// const watchSass = require("gulp-watch-sass");

sass.compiler = require("node-sass");

gulp.task("sass", function() {
  return gulp
    .src("src/scss/App.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./src/css"));
});

gulp.task("watch", function() {
  gulp.watch("src/scss/App.scss", gulp.series(sass));
});
