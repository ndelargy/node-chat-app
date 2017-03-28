const expect = require('expect');

var {isRealString} = require('./validation')

// isRealString
describe('isRealString', () => {
  it('should reject non string values', () => {
    var resultInteger = isRealString(77);
    expect(resultInteger).toBe(false);
    var resultObject = isRealString(new Object());
    expect(resultInteger).toBe(false);
  });
  it('should reject blank strings', () => {
    var resultBlank= isRealString('   ');
    expect(resultBlank).toBe(false);
  });
  it('should allow any other strings', () => {
    var resultValidString = isRealString('valid string');
    expect(resultValidString).toBe(true);
  });
});
