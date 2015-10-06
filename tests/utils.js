
export function pause(assert, milliseconds=5000) {

  QUnit.stop()

  // don't let the test hang if the server never responds
  assert.abortTimeout = window.setTimeout(() => {
    assert.ok(false, `The server did not respond within ${milliseconds / 1000}  seconds`)
  }, milliseconds)

}

export function resume(assert) {

  QUnit.start()
  window.clearTimeout(assert.abortTimeout)

}
