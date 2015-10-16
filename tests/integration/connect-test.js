import Socket from 'src/socket'
import {WebSocket, LongPoll} from 'src/transports'

function join(socket, name) {
  return new Promise((resolve, reject) => {
    let channel = socket.channel(name);
    channel.join()
      .receive("ok", msg => resolve({channel, payload: msg.payload}))
      .receive("error", error => {
        console.log('Join error:', error)
        reject(error)
      })
  });
}

[{name: 'WebSocket', klass: WebSocket}, {name: 'LongPoll', klass: LongPoll}].forEach(item => {

  const {name, klass} = item

  QUnit.test(`integration:connect ${name} can connect and send messages`, async assert => {
    assert.expect(6)

    let socket = new Socket("ws://phoenix-server.dev:4000/socket", {transport: klass})
    socket.connect()

    // pause QUnit so that we can wait for an asynchronous response
    let done = assert.async()

    let {channel: lobby, payload} = await join(socket, 'rooms:lobby')
    assert.deepEqual({nick: "abc"}, payload, "A join payload was received")

    lobby.on("new_msg", msg => {
      assert.deepEqual({body: "Elixir"}, msg, "Message events are sent")
    })

    lobby
      .push("new_msg", {body: "Elixir"})
      .receive("ok", msg => {
        assert.deepEqual({body: "Elixir"}, msg, "Message receive hook was called")
        done()
      })


    let done2 = assert.async()
    let {channel: bob, payload: payloadBob} = await join(socket, 'rooms:bob')
    assert.deepEqual({room: "bob"}, payloadBob, "A join payload was received from second channel")

    bob.on("new_msg", msg => {
      assert.deepEqual({body: "Hey!"}, msg, "Message events are sent to the second channel")
    })

    bob
      .push("new_msg", {body: "Hey!"})
      .receive("ok", msg => {
        assert.deepEqual({body: "Hey!"}, msg, "Message receive hook was called on the second channel")
        done2()
      })

  });

})

