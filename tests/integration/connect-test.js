import Socket from 'src/socket'
import {WebSocket, LongPoll} from 'src/transports'

[{name: 'WebSocket', klass: WebSocket}, {name: 'LongPoll', klass: LongPoll}].forEach(item => {

  const {name, klass} = item

  QUnit.test(`${name} can connect`, function(assert){
    assert.expect(6)

    let socket = new Socket("ws://phoenix-server.dev:4000/socket", {transport: klass})
    socket.connect()

    let lobby = socket.channel("rooms:lobby")

    // pause QUnit so that we can wait for an asynchronous response
    let done = assert.async()

    lobby.on("new_msg", msg => {
      assert.deepEqual({body: "Elixir"}, msg, "Message events are sent")
    })

    lobby
      .join()
      .receive("ok", ({payload}) => {
        assert.deepEqual({nick: "abc"}, payload, "A join payload was received")

        lobby
          .push("new_msg", {body: "Elixir"})
          .receive("ok", msg => {
            assert.deepEqual({body: "Elixir"}, msg, "Message receive hook was called")
            done()
          })

      })


    let bob = socket.channel("rooms:bob")

    let done2 = assert.async()

    bob.on("new_msg", msg => {
      assert.deepEqual({body: "Hey!"}, msg, "Message events are sent to the second channel")
    })

    bob
      .join()
      .receive("ok", ({payload}) => {
        assert.deepEqual({room: "bob"}, payload, "A join payload was received from second channel")

        bob
          .push("new_msg", {body: "Hey!"})
          .receive("ok", msg => {
            assert.deepEqual({body: "Hey!"}, msg, "Message receive hook was called on the second channel")
            done2()
          })

      })

  });

})

