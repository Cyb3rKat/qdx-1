// import { createStore, combineReducers, applyMiddleware, compose} from "redux";
// import expensesReducer from "../Reducers/expenses";
// import filtersReducer from "../Reducers/filters";
// import thunk from 'redux-thunk'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export default () => {
//   //store Creation
//   const store = createStore(
//     combineReducers({
//       expenses: expensesReducer,
//       filters: filtersReducer,
//     }),
//     composeEnhancers(applyMiddleware(thunk))
//   );

//   return store;
// };
