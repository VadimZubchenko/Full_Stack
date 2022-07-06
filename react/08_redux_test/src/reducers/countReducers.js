//the instance of redux's workflow. This is core of Redux!
// initialState is a same as state, so if it's changed then the page renders
const initialState = {
  counter: 0,
};
// this is start after dispatch("action.type")
const countReducer = (state = initialState, action) => {
  console.log("action type: ", action);
  switch (action.type) {
    case "INCREMENT":
      return {
        // this changes a state
        counter: state.counter + 1, // state.counter = initialState.counter
      };
    case "DECREMENT":
      return {
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

export default countReducer;
