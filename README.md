Usage:
  const errors = require('extended-rest-errors');
  errors.init({
    packageName:'MyApp'
    version:'0.1.0'
  })// optional
  throw new errors.BadRequestError();
  throw new errors.BadRequestError({message:'Invalid Request'},previousError);
  
  
Error Format :
    { 
      errorResponse: {
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
      }
    }

Supported Errors:

  400:BadRequestError
  401:UnauthorizedError
  403:ForbiddenError
  404:NotFoundError
  405:MethodNotAllowedError
  406:NotAcceptableError
  407:ProxyAuthenticationRequiredError
  408:RequestTimeoutError
  409:ConflictError
  410:GoneError
  411:LengthRequiredError
  412:PreconditionFailedError
  413:RequestEntityTooLargeError
  414:RequesturiTooLargeError
  415:UnsupportedMediaTypeError
  416:RangeNotSatisfiableError
  417:ExpectationFailedError
  418:ImATeapotError
  422:UnprocessableEntityError
  423:LockedError
  424:FailedDependencyError
  425:UnorderedCollectionError
  426:UpgradeRequiredError
  428:PreconditionRequiredError
  429:TooManyRequestsError
  431:RequestHeaderFieldsTooLargeError
  500:InternalServerError
  501:NotImplementedError
  502:BadGatewayError
  503:ServiceUnavailableError
  504:GatewayTimeoutError
  505:HttpVersionNotSupportedError
  511:NetworkAuthenticationRequiredError
