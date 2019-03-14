const counter = (state=0, action) =>{
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// const { createStore } = Redux;
// var createStore = Redux.createStore;
// import { createStore } from 'redux'; 
const createStore = ( reducer ) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = ( action ) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () =>{
            listeners = listeners.filter(l => l!==listener)
        }
    };
    dispatch({});

    return { getState, dispatch, subscribe };
}

const store = createStore(counter);

console.log(store.getState()); // 0

// store.dispatch({ type: 'INCREMENT'});
// console.log(store.getState()); // 1
const render = () => {
    document.body.innerText = store.getState();
}

store.subscribe(render);
render();
document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT'});
});