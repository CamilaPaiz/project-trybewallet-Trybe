// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { DELETED_TABLE_ITEM,
  EDIT_TABLE, EDIT_FINISHED,
  REQUEST_API, REQUEST_API_SUCESS, REQUEST_API_SUCESS_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idToEdit: 0,
  editor: false,
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
  case EDIT_TABLE:
    return {
      ...state,
      idToEdit: action.id,
      editor: true,
    };
  case EDIT_FINISHED:
    console.log(action.payload, 'despesa editada');
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((item) => {
        if (item.id === state.idToEdit) {
          return {
            ...action.payload, id: item.id, exchangeRates: item.exchangeRates,
          };
        }
        return item;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
