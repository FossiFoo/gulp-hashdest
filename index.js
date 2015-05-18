var through = require("through2"),
    gutil = require("gulp-util"),
    path = require("path"),
    crypto = require("crypto"),
    _ = require("lodash")
;

module.exports = function (options) {
    "use strict";

    options = _.defaults(options || {}, {
	prefix: "",
	hash: "sha1"
    });

    var hash = crypto.createHash(options.hash);
    var buffer = [];

    function calcHashes(file, enc, callback) {
	/*jshint validthis:true*/

        console.error("hash: " + file.path);

	if (file.isNull()) {
	    this.push(file);
	    return callback();
	}

	if (file.isStream()) {
	    this.emit("error", new gutil.PluginError("hashdest", "Stream content is not supported"));
	    return callback();
	}

	if (file.isBuffer()) {
	    hash.update(file.contents, "binary");
	    buffer.push(file);
	}

	return callback();
    }

    function moveFiles() {
	/*jshint validthis:true*/

        var hashstr = options.prefix + hash.digest("hex");
        gutil.log("move: " + buffer + " - " + hashstr);

        var self = this;
        buffer.forEach(function(file) {
            var filePath = file.path;
            var targetPath = path.join(path.dirname(filePath), hashstr, path.basename(filePath));
            gutil.log(filePath + " -> " + targetPath);
            file.path = targetPath;
            self.push(file);
        });

        this.emit("end");
    }

    return through.obj(calcHashes, moveFiles);
};
