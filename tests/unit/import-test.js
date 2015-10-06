import Socket from 'src/socket';

QUnit.test('can import the Socket class', function(assert){
  assert.equal(typeof Socket, 'function', 'the socket module should export a function');
});

