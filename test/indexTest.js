const assert = require('chai').assert;
const index = require('../index');

describe('index', function(){
  it('app should return hello', function(){
    assert.equal(index(), 'hello');
  });
});
