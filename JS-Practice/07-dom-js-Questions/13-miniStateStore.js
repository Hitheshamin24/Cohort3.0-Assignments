function createStore(initialState) {
  let state = initialState;
  let subscribers = [];

  function getState() {
    return state;
  }

  function setState(newState) {
    state = newState;
    subscribers.forEach((callback) => {
      callback(state);
    });
  }

  function subscribe(callback) {
    subscribers.push(callback);
   
  }
  return {
    getState,
    setState,
    subscribe,
  };
}

const stateStore = createStore(0);
console.log("====================================");
console.log(stateStore.getState());
console.log("====================================");
stateStore.subscribe((state) => console.log("Subscriber 1", state));
stateStore.subscribe((state) => console.log("Subscriber 2", state));

stateStore.subscribe((state) => console.log("subscriber 3", state));

stateStore.setState(1)