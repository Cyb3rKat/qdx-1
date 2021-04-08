import { createStore, combineReducers } from "redux";
import uuid from "uuid";

//action generators:

//ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

//SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

//SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

//SET_START_DATE
const setStartDate = (date = undefined) => ({
  type: "SET_START_DATE",
  date,
});

//SET_END_DATE
const setEndDate = (date = undefined) => ({
  type: "SET_END_DATE",
  date,
});

//get visible expenses
const getVisibleExpenses = (expenses, { startDate, endDate, text, sortBy }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch =
        text === "" ||
        expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt > b.createdAt ? -1 : 1;
      } else if (sortBy === "amount") {
        return a.amount > b.amount ? -1 : 1;
      }
    });
};

//expenses reducer defaults
const expensesReducerDefault = [];

//expenses reducer defaults
const expensesReducer = (state = expensesReducerDefault, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];

    case "REMOVE_EXPENSE":
      return state.filter((expense) => {
        return expense.id !== action.id;
      });

    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });

    default:
      return state;
  }
};

//filters reducer defaults
const filtersReducerDefaults = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

//filters reducer
const filtersReducer = (state = filtersReducerDefaults, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };

    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };

    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };

    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date,
      };

    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date,
      };

    default:
      return state;
  }
};

//store Creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseThree = store.dispatch(
  addExpense({ description: "three", amount: 300, createdAt: 5000 })
);
const expenseOne = store.dispatch(
  addExpense({ description: "myRentFee", amount: 500, createdAt: 1000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "coffee", amount: 800, createdAt: 2000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 800 }));

// store.dispatch(setTextFilter("nt"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(900));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(2500));

const demoState = {
  expenses: [
    {
      id: "taofasldfas",
      description: "january Rent",
      note: "tjos was the final payment for that address",
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined,
  },
};
