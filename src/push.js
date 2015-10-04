

export default class Push {

  // Initializes the Push
  //
  // channel - The Channel
  // event - The event, for example `"phx_join"`
  // payload - The payload, for example `{user_id: 123}`
  //
  constructor(channel, event, payload){
    this.channel      = channel
    this.event        = event
    this.payload      = payload || {}
    this.receivedResp = null
    this.afterHook    = null
    this.recHooks     = []
    this.sent         = false
  }

  send(){
    const ref         = this.channel.socket.makeRef()
    this.refEvent     = this.channel.replyEventName(ref)
    this.receivedResp = null
    this.sent         = false

    this.channel.on(this.refEvent, payload => {
      this.receivedResp = payload
      this.matchReceive(payload)
      this.cancelRefEvent()
      this.cancelAfter()
    })

    this.startAfter()
    this.sent = true
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: ref
    })
  }

  receive(status, callback){
    if(this.receivedResp && this.receivedResp.status === status){
      callback(this.receivedResp.response)
    }

    this.recHooks.push({status, callback})
    return this
  }

  after(ms, callback){
    if(this.afterHook){ throw(`only a single after hook can be applied to a push`) }
    let timer = null
    if(this.sent){ timer = setTimeout(callback, ms) }
    this.afterHook = {ms: ms, callback: callback, timer: timer}
    return this
  }


  // private

  matchReceive({status, response, ref}){
    this.recHooks.filter( h => h.status === status )
                 .forEach( h => h.callback(response) )
  }

  cancelRefEvent(){ this.channel.off(this.refEvent) }

  cancelAfter(){ if(!this.afterHook){ return }
    clearTimeout(this.afterHook.timer)
    this.afterHook.timer = null
  }

  startAfter(){ if(!this.afterHook){ return }
    let callback = () => {
      this.cancelRefEvent()
      this.afterHook.callback()
    }
    this.afterHook.timer = setTimeout(callback, this.afterHook.ms)
  }
}

