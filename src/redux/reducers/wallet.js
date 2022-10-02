// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { DELETED_TABLE_ITEM,
  REQUEST_API, REQUEST_API_SUCESS, REQUEST_API_SUCESS_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return state;
  case REQUEST_API_SUCESS:
    return {
      ...state,
      currencies: action.currencies,

    };
  case REQUEST_API_SUCESS_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETED_TABLE_ITEM:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
