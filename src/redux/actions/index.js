// Coloque aqui suas actions-actions type

export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
export const REQUEST_API_SUCESS_EXPENSES = 'REQUEST_API_SUCESS_EXPENSES,';
/* export const REQUEST_FAILURE = 'REQUEST_FAILURE'; */
export const DELETED_TABLE_ITEM = 'DELETED_TABLE_ITEM';
export const EDIT_TABLE = 'EDIT_TABLE';
export const EDIT_FINISHED = 'EDIT_FINISHED';

// actions creators

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const requestApiSucess = (payload) => ({
  type: REQUEST_API_SUCESS,
  currencies: payload,
});

export const requestApiSucessExpenses = (payload) => ({
  type: REQUEST_API_SUCESS_EXPENSES,
  expenses: payload,
});

/* export const receiveFailure = (error) => ({
  type: REQUEST_FAILURE,
  error,
}); */

export const deletedTableItem = (payload) => ({
  type: DELETED_TABLE_ITEM,
  payload,
});

export const editTable = (id) => ({
  type: EDIT_TABLE,
  id,
});

export const editFinished = (payload) => ({
  type: EDIT_FINISHED,
  payload,
});

// função thunk para requisição de api para tipos de moeda

export const getRequestApi = () => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const dataFiltered = Object.keys(data).filter((item) => item !== 'USDT'); // realizada com a ajuda da colega Caren Pontes
  return dispatch(requestApiSucess(dataFiltered));
};

// função thunk para requisição de api para expenses
export const getRequestApiExpenses = (state) => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(requestApiSucessExpenses({ ...state, exchangeRates: data }));
};

// função thunk para editar ?
