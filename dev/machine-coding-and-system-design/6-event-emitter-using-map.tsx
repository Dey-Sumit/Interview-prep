class EventEmitter {
  private events: Map<string, Array<(data?: any) => void>> = new Map();

  public sub(eventName: string, listener: (data?: any) => void) {
    const listeners = this.events.get(eventName) || [];
    listeners.push(listener);
    this.events.set(eventName, listeners);

    return () => {
      const updatedListeners = this.events.get(eventName)?.filter((fn) => fn !== listener);
      this.events.set(eventName, updatedListeners || []);
    };
  }

  public pub(eventName: string, payload?: any) {
    const subbedEvents = this.events.get(eventName);
    if (!subbedEvents?.length) return;
    subbedEvents.forEach((fn) => {
      fn(payload);
    });
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
