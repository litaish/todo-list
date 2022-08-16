export const pubsub = {
  // On subscribe, new event gets set to an empty array
  events: {},
  subscribe: (eventName, fn) => {
    console.log(`PUBSUB: someone just subscribed to know about ${eventName}`);
    // Add event as new if event does not exist or add to existing list
    pubsub.events[eventName] = pubsub.events[eventName] || [];
    // Push the passed in function for the corresponding event
    pubsub.events[eventName].push(fn);
  },
  unsubscribe: (eventName, fn) => {
    console.log(`PUBSUB: someone just UNsubscribed from ${eventName}`);
    //Remove an event function by name
    if (pubsub.events[eventName]) {
        pubsub.events[eventName] = pubsub.events[eventName].filter((f) => f !== fn);
    }
  },
  publish: (eventName, data) => {
    console.log(`PUBSUB: Making an broadcast about ${eventName} with ${data}`);
    // Emit / announce the event to subscribers, with the data
    if (pubsub.events[eventName]) {
        pubsub.events[eventName].forEach((f) => {
        f(data);
      });
    }
  },
};
