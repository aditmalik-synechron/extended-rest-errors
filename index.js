const httpStatusCodes = require('./status-codes.json');
Object.keys(httpStatusCodes).forEach(key => {
  exports[key] = class extends Error {
    constructor(options, causedBy) {
      super();
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = (new Error()).stack;
      }
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
      delete this.stack;
    }

    toString(){
      return JSON.stringify(this);
    }
  }
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

