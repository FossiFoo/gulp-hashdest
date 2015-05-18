"use strict";

var gulp = require("gulp"),
    hashdest = require("hashdest")
;

gulp.paths = {
  src: "src",
  dist: "dist"
};

gulp.task("default", function() {
    return gulp.src("index.js")
        .pipe(hashdest({prefix: "app-"}))
        .on("error", console.error)
        .pipe(gulp.dest("dist"))
    ;
});
