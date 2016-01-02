'use strict';

var fs = require('fs'),
  html = require('html-entities').AllHtmlEntities,
  path = require('path'),
  _ = require('lodash'),
  gutil = require('gulp-util'),
  through = require('through2'),
  vorlonChecker = require('./lib/vorlon-checker');

var PluginError = gutil.PluginError,
  PLUGIN_NAME = 'gulp-webstandards',
  symbols = {
    'ok': '✓',
    'err': '✖',
    'space': '  '
  };

// With node.js on Windows: use symbols available in terminal default fonts
if (process && process.platform === 'win32') {
  symbols.ok = '\u221A';
  symbols.err = '\u00D7';
}

function stripVorlonHtml (s) {
  var suggestion = s.split(':');
  suggestion[0] = suggestion[0].replace(/<\/?strong>/g, '').trim();
  suggestion[1] = suggestion[1].trim();
  return suggestion;
}

function prettyPrintVorlon (results) {
  _.forIn(results.rules, function (item) {
    _.forIn(item.rules, function (rule) {
      if (rule.failed) {
        // print rule title
        gutil.log(symbols.space, gutil.colors.red(symbols.err), gutil.colors.red(rule.title));
        gutil.log(symbols.space, symbols.space, rule.description);

        // print suggestions
        _.forIn(rule.items, function (suggestion) {
          if ('title' in suggestion && suggestion.title !== null) {
            // only one suggestions
            gutil.log(new Array(5).join(symbols.space),
              html.decode(suggestion.title.replace(/\r?\n|\r/g, ' ')));

          } else {
            _.forIn(suggestion.items, function (subsug) {
              gutil.log(new Array(5).join(symbols.space),
                html.decode(subsug.title.replace(/\r?\n|\r/g, ' ')));

              _.forIn(_.pluck(subsug.items, 'title'), function (i) {
                gutil.log(new Array(7).join(symbols.space),
                  stripVorlonHtml(i)[0], 'is', gutil.colors.red(stripVorlonHtml(i)[1]));
              });
            });
          }
        });
      } else {
        gutil.log(symbols.space, gutil.colors.green(symbols.ok), gutil.colors.dim(rule.title));
      }
    });
  });
}

// Plugin level function(dealing with files)
function webstandards () {
  return through.obj(function (file, enc, cb) {
    var contents = null,
      language = null;
    if (file.isBuffer()) {
      if (typeof file.path === 'string') {
        // for some reason file.extname is sometimes undefined but file.path is available.
        language = file.extname !== undefined ? file.extname : path.extname(file.path);
        // should we be ignoring this file?
        if (['.html', '.html', '.js', '.css'].indexOf(language) === -1) {
          gutil.log(gutil.colors.dim('Ignoring'), gutil.colors.dim(file.relative));
          return cb(null, file);
        }

        try {
          gutil.log('Checking', gutil.colors.underline(file.relative));
          // Unfortunately vorlon, jsdom & cssjs accept only the whole file and not a buffer
          contents = fs.readFileSync(file.path, enc).toString();
        } catch (e) {
          this.emit('error', new PluginError(PLUGIN_NAME, 'Error reading file'));
        }

        // pass off to the approriate checker function...
        try {
          if (['.html', '.htm'].indexOf(language) !== -1) {
            prettyPrintVorlon(vorlonChecker.checkHTML(contents));
          } else if (language === '.js') {
            prettyPrintVorlon(vorlonChecker.checkJavaScript(contents));
          } else if (language === '.css') {
            prettyPrintVorlon(vorlonChecker.checkCSS(contents));
          }

        } catch (e) {
          // in case of a jsdom error
          gutil.log(gutil.colors.red('Internal error:'), e.message);
        }
        cb(null, file);

      } else {
        // We need file paths to be able to read the file and load it into jsdom. one day we will do this statically.
        this.emit('error', new PluginError(PLUGIN_NAME, "Needs filepaths so you can't have any plugins before it."));
        cb('err', file);
      }
    } else if (file.isNull()) {
      // ignore empty files
      cb(null, file);
    } else {
      // we don't do streams because we don't have a file path typically
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      cb('err', file);
    }
  });
}

module.exports = webstandards;
