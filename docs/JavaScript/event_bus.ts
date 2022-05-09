type Event = (param?:any) => void

class EventBus {
  events: {
    [eventName: string]: Array<{ event: Event; once?: boolean}> 
  } = {}

  /**
   *  监听自定义事件
   * @param eventName 
   * @param handler 
   * @param once 
   */
  on(eventName: string, handler: Event, once = false) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    if (!handler.name) {
      console.warn('\n为防止潜在BUG，请使用具名函数作为回调\n')
    }
    if (this.events[eventName].find((event) => event.event.name === handler.name)) {
      console.warn(
        '【潜在BUG预警】',
        '已存在事件方法名为',
        handler.name,
        '的事件，',
        eventName,
        '的订阅事件有',
        this.events[eventName].length,
        '个'
      )
    }
    this.events[eventName].push({
      event: handler, once
    })
    return handler
  }

  /** 监听自定义事件，并确保`eventName`事件只有本次订阅。
   * 多数情况下一个事件是只有一个订阅的，使用此方法代替`on`，可以避免某个事件被重复订阅多次的bug(严重可能会发送大量重复请求到服务器) */
  one(eventName: string, handler: Event) {
    this.clear(eventName)
    return this.on(eventName, handler, true)
  }

   /** 监听自定义事件，执行完成后取消监听 */
  once(eventName: string, handler: Event) {
    return this.on(eventName, handler, true)
  }


  /** 发布自定义事件 */
  emit(eventName: string, param?: any) {
    const events = [...(this.events[eventName] || []) ]
    events.forEach((event, i) => {
      event.event(param)
      if (event.once) {
        events[eventName].splice(i, 1)
      }
    })
  }

  /** 取消订阅事件 */
  off(eventName: string, handler: Event) {
    const events = this.events[eventName] || []
    const index = events.findIndex((event) => event.event === handler)
    events.splice(index, 1)
  }

  /**
   * 清除所有订阅事情
   * @param eventName 
   */
  clear(eventName: string) {
    this.events[eventName] = []
  }
}

const bus = new EventBus()

export default bus


// 使用
bus.on('UPDATE', () => {})