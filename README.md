# gulp-hashdest

> hashdest plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-hashdest` as a development dependency:

```shell
npm install --save-dev gulp-hashdest
```

Then, add it to your `gulpfile.js`:

```javascript
var hashdest = require("gulp-hashdest");

gulp.src("./src/*.js")
	.pipe(hashdest({
		"prefix": "foo-"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### hashdest(options)

#### options.prefix
Type: `String`
Default: ``

Prefix for inserted path.

#### options.hash
Type: `String`
Default: `sha1`

Type of hash. All values allowed for crypto are valid.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
