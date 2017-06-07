const httpStatusCodes = require('./status-codes.json');
Object.keys(httpStatusCodes).forEach(key => {
  exports[key] = function (options, causedBy) {
    this.errorResponse = Object.assign({
      'packageName': process.env.NODE_PACKAGE_NAME || 'unknown',
      'version': process.env.NODE_PACKAGE_VERSION || 'unknown',
      'category': '',//TBD
      'path': '',//TBD
      'causedBy': causedBy || {},
      'code': httpStatusCodes[key].code,
      'exception': key,
      'message': httpStatusCodes[key].message,
      'source': process.env.NODE_ENV === 'production' ? '' : this.stack,
      'status': 'Internal server error',
      'timestamp': Date.now().toString(),
      'validationErrors': []
    }, options);
  };
  exports[key].prototype = new Error;
});
exports.init = function init(options) {
  options = options || {};
  process.env.NODE_PACKAGE_NAME = options.pkgName || 'unknown';
  process.env.NODE_PACKAGE_VERSION = options.pkgVersion || 'unknown';
};
