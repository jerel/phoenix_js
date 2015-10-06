import Socket from 'src/socket';

QUnit.test('can connect', function(assert){
  assert.expect(1)

  let socket = new Socket("ws://localhost:4000/socket")
  socket.connect()

  let channel = socket.channel("rooms:lobby", {})

  // pause QUnit so that we can wait for an asynchronous response
  QUnit.stop()

  channel
    .join()
    .receive("ok", resp => {
      assert.ok(true, "A join response was received")
      // a response was received, continue with tests
      QUnit.start()
    })
    .receive("error", resp => {
      QUnit.start()
    })
});

