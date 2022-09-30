// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { REQUEST_API, REQUEST_API_SUCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
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
  default:
    return state;
  }
};

export default wallet;
