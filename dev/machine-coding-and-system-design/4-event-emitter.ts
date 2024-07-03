type EventHandler<T> = (data: T) => void;
class EventEmitter {
  private events: Record<string, Array<EventHandler<any>>> = {};

  public publish<T>(eventName: string, eventData: T) {
    const eventHandlers = this.events[eventName];
    if (eventHandlers) {
      eventHandlers.forEach((handler) => {
        handler(eventData);
      });
    }
  }

  public subscribe<T>(eventName: string, handler: (data: T) => void): () => void {
    if (!this.events[eventName]) {
      this.events[eventName] = [handler];
    } else {
      this.events[eventName].push(handler);
    }

    return () => {
      const handlers = this.events[eventName];
      const filteredHandlers = handlers.filter((h) => h !== handler);
      this.events[eventName] = filteredHandlers;
    };
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
