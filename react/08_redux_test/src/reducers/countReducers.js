//the instance of redux's workflow. This is core of Redux!
const initialState = {
  counter: 0,
};

const countReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "INCREMENT":
      return {
        counter: state.counter + 1,
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
