var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var res = generateMessage('Nicole Kidman', 'yo');
    expect(res.from).toBe('Nicole Kidman');
    expect(res.text).toBe('yo');
    expect(res.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    var res = generateLocationMessage('youza', 1, 1);
    expect(res).toInclude({
      from: 'youza',
      url: 'https://www.google.com/maps?q=1,1'
    });
    expect(res.createdAt).toBeA('number');
  });
});
