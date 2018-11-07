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

  it('n', function(){
      let result = app.getDefault();
      console.log("\nYoke:", result);
      assert.equal(result.statusCode, 403);
  });
});
