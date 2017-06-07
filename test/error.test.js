const errors = require('../index');
const package = require('../package.json')
test('Test BadRequestError', () => {
  try {
    throw new errors.BadRequestError();
  } catch (ex) {
    expect(ex.errorResponse.status).toBeDefined();
    expect(ex.errorResponse.code).toBe(400);
    expect(ex.errorResponse.source).toBeTruthy();
  }
});
test('Test BadRequestError for Production environment', () => {
  try {
    process.env.NODE_ENV = 'production';
    throw new errors.BadRequestError();
  } catch (ex) {
    expect(ex.errorResponse.status).toBeDefined();
    expect(ex.errorResponse.code).toBe(400);
    expect(ex.errorResponse.source).toBeFalsy();
  }
});
test('Test Package name & version', () => {
  try {
    errors.init({
      pkgName: package.name,
      pkgVersion: package.version
    });
    throw new errors.BadRequestError();
  } catch (ex) {
    expect(ex.errorResponse.packageName).toBe(package.name);
    expect(ex.errorResponse.version).toBe(package.version);
  }
});
