// REDUCER - this is the same code we wrote in our previous app.

const ticketListReducer = (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
  case 'ADD_TICKET':
    return Object.assign({}, state, {
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  case 'DELETE_TICKET':
    const newState = { ...state };
    delete newState[id];
    return newState;
  default:
    return state;
  }
};

// REDUX STORE - Everything below this line is new code!

const { createStore } = Redux; // Redux comes from the CDN (Content Delivery Network). We need this function to actually build our store.

const store = createStore(ticketListReducer); // createStore() takes in a reducer as an argument.

console.log(store.getState()); // logs our initial state in the console

// In order to actually log changes to state, we need to listen for changes with the subscribe() method. We use the pubsub pattern here.
// Pubsub pattern is when the publishers and subscribers don't need to know about each other - the store acts as an intermediary between them.
const unsubscribe = store.subscribe(() => console.log(store.getState())); // We've subscribed!
// When we subscribe, it just means our code is actively listening.
// When we subscribe to a magazine, it doesn't mean we get an issue immediately. It just means that the next time an issue is published, we will get that issue.
// Note that we can call the code above without saving it in the unsubscribe constant. However, then we won't be able to unsubscribe to it later. It is similar to when we used setInterval() in the past. If we set an interval without saving it in a variable, there's no way for us to stop the interval from continuing.

// We've subscribed - now what about getting the new issue of that magazine?
// Well, we need to publish it first. We do this with the dispatch() method.
store.dispatch({
  type: 'ADD_TICKET',
  names: 'Jasmine and Justine',
  location: '2a',
  issue: 'Reducer has side effects.',
  id: 1
});

store.dispatch({
  type: 'ADD_TICKET',
  names: 'Brann and Rose',
  location: '3b',
  issue: 'Problems understanding Redux.',
  id: 2
});

store.dispatch({
  type: 'DELETE_TICKET',
  id: 1
});
// Each time an action is dispatched, it will trigger our subscription and log the result of store.getState() to the console.

unsubscribe(); // ends our subscription.
// We've read enough issues of our new magazine and we don't want more issues to come in the mail.

store.dispatch({
  type: 'DELETE_TICKET',
  id: 2
}); // this action dispatch won't trigger the console.log because we have unsubscribed our change listeners.