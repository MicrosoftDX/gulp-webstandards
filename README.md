gulp-webstandards
==========

gulp-webstandards is a Gulp plugin that improves your site with modern web standards.
It checks if your website is using correct CSS prefixes, using up to date JavaScript
libraries, using responsive web design, if you're defining platform icons, using 
an appropriate meta viewport, not using HTML object and embed, avoiding conditional
comments, using a modern doctype and more! Powered by [Vorlon.JS](http://www.vorlonjs.com/).

It is immediately usable as part of your Gulp workflow, see the example below.

Installation
============

### Install: 

```sh
npm install --save-dev gulp-webstandards
```

### Usage:

```node
var gulp = require('gulp');
var webstandards = require('gulp-webstandards');

gulp.task('webstandards', function () {
    return gulp.src('YOUR_COMPILED_FILES/**/*')
        .pipe(webstandards());
});
```

Authors
=======

* [@ramisayar](http://twitter.com/ramisayar)

API
===

### webstandards()
There are no parameters to pass. Pipe in your compiled HTML, CSS & JS files into the webstandards plugin 
first, so that the Vinyl File object retains the file path.

Streams are not supported.

Contributing
============

Read CONTRIBUTING.md for more info on contributing to gulp-webstandards.

License
=======

Copyright (c) Microsoft Corporation
Licensed under the The MIT License (MIT)

See LICENSE
