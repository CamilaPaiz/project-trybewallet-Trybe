// Coloque aqui suas actions-actions type

export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';

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

// função thunk para requisição de api

export const getRequestApi = () => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const dataFiltered = Object.keys(data).filter((item) => item !== 'USDT');
  return dispatch(requestApiSucess(dataFiltered));
};
