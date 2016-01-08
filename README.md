# gulp-webstandards

> Gulp plugin that improves your site with modern web standards.

gulp-webstandards is a Gulp plugin that improves your site with modern web standards. It checks if your website is using correct CSS prefixes, using up to date JavaScript libraries, using responsive web design, if you're defining platform icons, using an appropriate meta viewport, not using HTML object and embed, avoiding conditional comments, using a modern doctype and more! Powered by [Vorlon.JS](http://www.vorlonjs.com/).

Don't use Gulp? [Try the Grunt version](https://github.com/MicrosoftDX/grunt-webstandards).

![gulp-webstandards](https://raw.github.com/MicrosoftDX/gulp-webstandards/master/demo.gif)

## Features

Grunt-webstandards helps you write good code that follows modern web standards. There are many best practices to follow when building your website and it's hard to remember them all. There are always little things we forget to include in our code but would it work better across browsers. This plugin will check your HTML/CSS/JS files to make sure you're following these best practices and to warn you when you're not. 

* **Avoid browser detection**: tells you if you have code calling navigator.userAgent. We have standards to avoid writing specific code for specific browsers. Furthermore, browser user-agent strings are mostly a lie and can easily be spoofed. There are too many user-agent strings, that you are likely to accidentally not support a device that can render your content. The best approach is to rely on feature detection which tests if a browser can perform a specific feature. [Modernizr](https://modernizr.com/) is the solution.

* **Using responsive design**: warns you to use a responsive approach to support unexpected devices and screen ratios.

* **Avoid conditionnal comment**: conditional comments are not the best way to adapt your website to a target browser, and support is dropped for IE > 9. Use feature detection instead.

* **Incorrect use of prefixes**: if you are using vendor-specifc CSS prefixes, this makes sure you are also using the standard CSS.

* **No object and embed**: the modern web is only about web languages not plugins, activeX and other embeded objects. This validates that your website does not include those pesky plugins.

* **Up to date JavaScript libraries**: checks if all the JS files are up to date ensuring better cross-browser support and less security holes.

* **Use modern doctype**: Modern doctype like <!DOCTYPE html> are better for browser compatibility and enable HTML5 features.

* **define platform icons**: adding icons to help users pin your website on mobile devices provides a superior experience.

* **use meta viewport**: using the meta viewport tag will help the small-screen browsers render your HTML correctly.

## Installation

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

## Authors

* [@ramisayar](http://twitter.com/ramisayar)

## API

### webstandards()
There are no parameters to pass. Pipe in your compiled HTML, CSS & JS files into the webstandards plugin first, so that the Vinyl File object retains the file path.

Streams are not supported.

## Contributing

Read [CONTRIBUTING.md](https://raw.githubusercontent.com/MicrosoftDX/gulp-webstandards/master/CONTRIBUTING.md) for more info on contributing to gulp-webstandards.

## License

Copyright (c) Microsoft Corporation
Licensed under the The MIT License (MIT)

See [LICENSE](https://raw.githubusercontent.com/MicrosoftDX/gulp-webstandards/master/LICENSE)
