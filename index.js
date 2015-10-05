var fs     = require("fs")
var bunyan = require("bunyan");

/**
 *  Common method to log used by the crawler and if needed by plugins
 *  Ideally, the log json structure should contains the following attributes :
 *  - url (can be null for specific crawl steps).
 *  - step
 *  - message
 *  - options
 *
 * @return
 */

var infoFile = process.cwd() + "/logs/crawler.log";
var debugFile = process.cwd() + "/logs/debug.log";

console.log("Use info log in : " + infoFile);
console.log("Use debug log in : " + debugFile);


/**
 *  Default logger
 *
 */
var Logger = bunyan.createLogger({
  name: 'full-log',
  streams: [
    {
      type: 'rotating-file',
      period : '5h',
      path: infoFile,
      level : 'info'
    },
    {
      type: 'rotating-file',
      period : '5h',
      level: 'debug',
      path: debugFile,

    },
  ]
});

/**
 * If needed, a plugin can create a specific log
 *
 *
 * @param the name of the Logger
 * @param the json config structure (see bunyan documemntion )
 * @return the new logger
 */
var createLogger = function(name, streamInfo) {
  return bunyan.createLogger({
    name: name,
    streams: [
      streamInfo
    ]
  });

}

module.exports.Logger = Logger;
module.exports.createLogger = createLogger;
