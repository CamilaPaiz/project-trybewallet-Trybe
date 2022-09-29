// Coloque aqui suas actions-actions type

export const ADD_EMAIL = 'ADD_EMAIL';

// actions creators

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});
