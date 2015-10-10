import Socket from 'src/socket'
import {WebSocket, LongPoll} from 'src/transports'
import {pause, resume} from 'tests/utils'

[{name: 'WebSocket', klass: WebSocket}, {name: 'LongPoll', klass: LongPoll}].forEach(item => {

  const {name, klass} = item

  QUnit.test(`${name} can connect`, function(assert){
    assert.expect(2)

    let socket = new Socket("ws://phoenix-server.dev:4000/socket", {transport: klass})
    socket.connect()

    let channel = socket.channel("rooms:lobby", {})

    // pause QUnit so that we can wait for an asynchronous response
    pause(assert)

    channel
      .join()
      .receive("ok", resp => {
        assert.ok(true, "A join response was received")

        channel
          .push("ping", {lang: "Elixir"})
          .receive("ok", resp => {
            assert.ok(true, "Message echoed")
            resume(assert)
          })

      })

  });

})

