import { CHANNEL_STATES, CHANNEL_EVENTS } from './constants'
import Push from './push'
import Timer from './utils/timer'


export default class Channel {
  constructor(topic, params, socket) {
    this.state       = CHANNEL_STATES.closed
    this.topic       = topic
    this.params      = params || {}
    this.socket      = socket
    this.bindings    = []
    this.joinedOnce  = false
    this.joinPush    = new Push(this, CHANNEL_EVENTS.join, this.params)
    this.pushBuffer  = []
    this.rejoinTimer  = new Timer(
      () => this.rejoinUntilConnected(),
      this.socket.reconnectAfterMs
    )
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined
      this.rejoinTimer.reset()
    })
    this.onClose( () => {
      this.socket.log("channel", `close ${this.topic}`)
      this.state = CHANNEL_STATES.closed
      this.socket.remove(this)
    })
    this.onError( reason => {
      this.socket.log("channel", `error ${this.topic}`, reason)
      this.state = CHANNEL_STATES.errored
      this.rejoinTimer.setTimeout()
    })
    this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
      this.trigger(this.replyEventName(ref), payload)
    })
  }

  rejoinUntilConnected(){
    this.rejoinTimer.setTimeout()
    if(this.socket.isConnected()){
      this.rejoin()
    }
  }

  join(){
    if(this.joinedOnce){
      throw(`tried to join multiple times. 'join' can only be called a single time per channel instance`)
    } else {
      this.joinedOnce = true
    }
    this.sendJoin()
    return this.joinPush
  }

  onClose(callback){ this.on(CHANNEL_EVENTS.close, callback) }

  onError(callback){
    this.on(CHANNEL_EVENTS.error, reason => callback(reason) )
  }

  on(event, callback){ this.bindings.push({event, callback}) }

  off(event){ this.bindings = this.bindings.filter( bind => bind.event !== event ) }

  canPush(){ return this.socket.isConnected() && this.state === CHANNEL_STATES.joined }

  push(event, payload){
    if(!this.joinedOnce){
      throw(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`)
    }
    let pushEvent = new Push(this, event, payload)
    if(this.canPush()){
      pushEvent.send()
    } else {
      this.pushBuffer.push(pushEvent)
    }

    return pushEvent
  }

  // Leaves the channel
  //
  // Unsubscribes from server events, and
  // instructs channel to terminate on server
  //
  // Triggers onClose() hooks
  //
  // To receive leave acknowledgements, use the a `receive`
  // hook to bind to the server ack, ie:
  //
  //     channel.leave().receive("ok", () => alert("left!") )
  //
  leave(){
    return this.push(CHANNEL_EVENTS.leave).receive("ok", () => {
      this.socket.log("channel", `leave ${this.topic}`)
      this.trigger(CHANNEL_EVENTS.close, "leave")
    })
  }

  // Overridable message hook
  //
  // Receives all events for specialized message handling
  onMessage(event, payload, ref){}

  // private

  isMember(topic){ return this.topic === topic }

  sendJoin(){
    this.state = CHANNEL_STATES.joining
    this.joinPush.send()
  }

  rejoin(){
    this.sendJoin()
    this.pushBuffer.forEach( pushEvent => pushEvent.send() )
    this.pushBuffer = []
  }

  trigger(triggerEvent, payload, ref){
    this.onMessage(triggerEvent, payload, ref)
    this.bindings.filter( bind => bind.event === triggerEvent )
                 .map( bind => bind.callback(payload, ref) )
  }

  replyEventName(ref){ return `chan_reply_${ref}` }
}

