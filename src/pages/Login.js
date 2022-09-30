import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addEmail, getRequestApi } from '../redux/actions';

class Login extends React.Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyInput());
  };

  verifyInput = () => {
    const { email, password } = this.state;
    const emailCharacters = /\S+@\S+\.\S+/;
    const emailValidation = emailCharacters.test(email);
    const minPasswordLength = 6;
    const validPassword = password.length >= minPasswordLength;
    this.setState({ isDisabled: !(emailValidation && validPassword) });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    dispatch(getRequestApi());
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email-input">
          E-mail
          <input
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }

          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            type="text"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }

          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }

        >
          Entrar
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
