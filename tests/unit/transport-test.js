import { LongPoll } from 'src/transports'
import { SOCKET_STATES, TRANSPORTS } from 'src/constants'


// create a copy that won't actually connect
class LongPollFake extends LongPoll {
  poll() {}
}

class LongPollFakeConnect extends LongPoll {
  poll() {
    throw "now polling"
  }
}


QUnit.test('unit:transport LongPoll instantiation', assert => {

  assert.equal(typeof LongPoll, 'function', 'the transport module should have a named export');

  var lp = new LongPollFake("ws://localhost")
  assert.equal("http://localhost", lp.pollEndpoint, "Endpoint is normalized to http")

  var lp = new LongPollFake("wss://localhost")
  assert.equal("https://localhost", lp.pollEndpoint, "Endpoint is normalized to https")

  assert.equal(SOCKET_STATES.connecting, lp.readyState, "Starts in the ready state")

  assert.ok(lp.skipHeartbeat, "Heartbeat is off by default")

  assert.throws(() => {
    new LongPollFakeConnect('ws://localhost')
  }, "Polling starts when class is instantiated")
});


QUnit.test('unit:transport LongPoll internals', assert => {
  assert.expect(6)
  var lp = new LongPollFake("ws://localhost")
  lp.token = "abcdefg"

  assert.equal("http://localhost?token=abcdefg", lp.endpointURL(), "Token is appended to url")

  var lp = new LongPollFake("ws://localhost")
  lp.closeAndRetry()
  assert.equal(SOCKET_STATES.connecting, lp.readyState, "Close and retry sets state to connecting")

  var lp = new LongPollFake("ws://localhost")
  lp.onclose = () => {
    assert.ok(true, "Closing calls the onclose handler")
  }
  lp.close()
  assert.equal(SOCKET_STATES.closed, lp.readyState, "Close sets state to closed")

  var lp = new LongPollFake("ws://localhost")
  lp.onerror = reason => {
    assert.equal("timeout", reason, "XHR timeout calls the onerror handler")
  }
  lp.ontimeout()
  assert.equal(SOCKET_STATES.connecting, lp.readyState, "A timeout sets state to connecting")
})

