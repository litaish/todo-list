export const pubsub = {
  // On subscribe, new event gets set to an empty array
  events: {},
  subscribe: (eventName, fn) => {
    console.log(`PUBSUB: someone just subscribed to know about ${eventName}`);
    // Add event as new if event does not exist or add to existing list
    this.events[eventName] = this.events[eventName] || [];
    // Push the passed in function for the corresponding event
    this.events[eventName].push(fn);

    for (const [key, value] of Object.entries(events)) {
      console.log(`${key}: ${value}`);
    }
  },
  unsubscribe: (eventName, fn) => {
    console.log(`PUBSUB: someone just UNsubscribed from ${eventName}`);
    //Remove an event function by name
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((f) => f !== fn);
    }
  },
  publish: (eventName, data) => {
    console.log(`PUBSUB: Making an broadcast about ${eventName} with ${data}`);
    // Emit / announce the event to subscribers, with the data
    if (this.events[eventName]) {
      this.events[eventName].forEach((f) => {
        f(data);
      });
    }
  },
};
