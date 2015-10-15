import Socket from 'src/socket';

QUnit.test('unit:import Can import the Socket class', assert => {
  assert.equal(typeof Socket, 'function', 'the socket module should export a function');
});

