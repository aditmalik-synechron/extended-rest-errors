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
      'status': httpStatusCodes[key].status,
      'timestamp': Date.now().toString(),
      'validationErrors': []
    }, options);
  };
  exports[key].prototype = new Error;
});
exports.init = function init(options) {
  options = options || {};
  process.env.NODE_PACKAGE_NAME = options.packageName || 'unknown';
  process.env.NODE_PACKAGE_VERSION = options.packageVersion || 'unknown';
};
exports.status = function (code,options,causedBy) {
  for(let key in httpStatusCodes){
      if(httpStatusCodes[key].code===code){
        return exports[key];
      }
  }
  return exports.InternalServerError;
};
