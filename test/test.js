/* global describe, it */

'use strict';

var assert = require('assert'),
  fs = require('fs'),
  path = require('path'),
  es = require('event-stream'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  webstandards = require('../index');

var fixtures = function (glob) {
  return path.join(__dirname, 'fixtures', glob);
};

describe('gulp-webstandards', function () {
  it('should emit error on streamed file', function (done) {
    gulp.src(fixtures('*'), {'buffer': false})
      .pipe(webstandards())
      .on('error', function (err) {
        assert.equal(err.message, 'Streams are not supported!');
        done();
      });
  });

  it('should let null files pass through', function (done) {
    var stream = webstandards(),
      n = 0;
    stream.pipe(es.through(function (file) {
      assert.equal(file.path, 'null.md');
      assert.equal(file.contents, null);
      n++;
    }, function () {
      assert.equal(n, 1);
      done();
    }));
    stream.write(new gutil.File({
      'path': 'null.md',
      'contents': null
    }));
    stream.end();
  });

  it('should work in buffer mode', function (done) {
    var files = new gutil.File({
        'path': fixtures('sample.html'),
        'contents': fs.readFileSync(fixtures('sample.html'))
      }),
      checker = webstandards();

    checker.write(files);
    // wait for the file to come back out
    checker.once('data', function (file) {
      // make sure it came out the same way it went in
      assert(file.isBuffer());
      // check the contents
      assert.equal(file.contents.toString('utf8'), fs.readFileSync(fixtures('sample.html')));
      done();
    });
  });
});
