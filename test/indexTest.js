const assert = require('chai').assert;
const index = require('../index');
const app = require('../index.js');

describe('index', function(){
  it('sayHello should return hello', function(){
      let result = app.sayHello();
      assert.equal(result, 'hello');
  });

  it('sayHello should return type string', function(){
        let result = app.sayHello();
        assert.typeOf(result, 'string');
  });

  it('type of result should be string', function(){
      let result = app.getDefault();
      assert.typeOf(result, "string");
  });

  it('status should be 200', function(){
      let result = app.getDefault();
      console.log(result);
      assert.equal(result, 200);
  });
});
