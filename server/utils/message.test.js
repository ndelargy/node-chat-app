var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var res = generateMessage('Nicole Kidman', 'yo');
    expect(res.from).toBe('Nicole Kidman');
    expect(res.text).toBe('yo');
    expect(res.createdAt).toBeA('number');
  });
});
