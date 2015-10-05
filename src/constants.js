
export const VSN = "1.0.0"

export const SOCKET_STATES = {connecting: 0, open: 1, closing: 2, closed: 3}

export const CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
}

export const CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
}

export const TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
}

