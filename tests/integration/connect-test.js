import Socket from 'src/socket'
import {LongPoll} from 'src/transports'
import {pause, resume} from 'tests/utils'

QUnit.test('can connect', function(assert){
  assert.expect(1)

  let socket = new Socket("ws://localhost:4000/socket", {transport: LongPoll})
  socket.connect()

  let channel = socket.channel("rooms:lobby", {})

  // pause QUnit so that we can wait for an asynchronous response
  pause(assert)

  channel
    .join()
    .receive("ok", resp => {
      assert.ok(true, "A join response was received")
      // a response was received, continue with tests
      resume(assert)
    })
});

