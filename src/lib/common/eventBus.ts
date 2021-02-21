interface IEventList {
  [key: string]: (any) => void;
}
export type EventBusType = {
  eventList: IEventList;
  on: (eventName: string, callback: any) => void;
  emit: (eventName: string, callback: any) => void;
  off: (eventName: string, callback: any) => void;
};

export default class EventBus {
  eventList: {};
  constructor() {
    this.eventList = {};
  }
  // 订阅
  on(eventName, callback) {
    this.eventList[eventName] = this.eventList[eventName] || [];
    this.eventList[eventName].push(callback);
  }
  // 发布
  emit(eventName, data) {
    if (this.eventList[eventName]) {
      this.eventList[eventName].forEach(function (callback) {
        callback(data);
      });
    }
  }
  off(eventName, callback) {
    if (this.eventList[eventName]) {
      for (let i = 0; i < this.eventList[eventName].length; i++) {
        if (this.eventList[eventName][i] === callback) {
          this.eventList[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
}
