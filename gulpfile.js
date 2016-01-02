'use strict';

var concat = require('gulp-concat'),
  eslint = require('gulp-eslint'),
  gulp = require('gulp'),
  insert = require('gulp-insert'),
  mocha = require('gulp-mocha'),
  path = require('path'),
  runSequence = require('run-sequence'),
  sourcemaps = require('gulp-sourcemaps'),
  typescript = require('gulp-typescript');

/**
 * Default Tasks
 */
gulp.task('default', function (cb) {
  runSequence('lint', 'mocha', cb);
});

/**
 * Run ESLint
 */
gulp.task('lint', function () {
  gulp.src(['*.js', 'lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * Run Mocha
 */
gulp.task('mocha', function () {
  return gulp.src(['test/**/*.js', '!test/fixtures/**/*.js'], {'read': false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({'reporter': 'spec'}));
});

/**
 * Compile Custom Vorlon
 */
gulp.task('compile-vorlon', function () {
  return gulp.src(['vendor/custom-vorlon/rules/**/*.ts', 'vendor/custom-vorlon/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript({
      'declarationFiles': true,
      'noExternalResolve': true,
      'target': 'ES5'
    }))
    .pipe(concat('vendor/vorlon.js'))
    .pipe(insert.append('module.exports = VORLON;\n'))
    .pipe(sourcemaps.write({
      'includeContent': false,
      // Return relative source map root directories per file.
      'sourceRoot': function (file) {
        var sourceFile = path.join(file.cwd, file.sourceMap.file);
        return path.relative(path.dirname(sourceFile), file.cwd);
      }
    }))
    .pipe(gulp.dest('.'));
});

/**
 * Generate Vorlon TypeScript Definition File
 */
gulp.task('gen-vorlon-dts', function () {
  var tsResult = gulp.src(['vendor/custom-vorlon/rules/**/*.ts', 'lib/custom-vorlon/*.ts'])
    .pipe(concat('vendor/vorlon.d.ts'))
    .pipe(typescript({
      'declarationFiles': true,
      'noExternalResolve': true,
      'target': 'ES5'
    }));
  return tsResult.dts.pipe(gulp.dest('.'));
});
