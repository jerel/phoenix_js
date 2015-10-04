
const VSN = "1.0.0"
const SOCKET_STATES = {connecting: 0, open: 1, closing: 2, closed: 3}
const CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
}
const CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
}
const TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
}

export { VSN, SOCKET_STATES, CHANNEL_STATES, TRANSPORTS }

