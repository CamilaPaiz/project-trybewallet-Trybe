import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          <input
            data-testid="value-input"
            type="text"
            name="despesa"
            placeholder="Valor"
          />
        </label>
        <label htmlFor="description-input">
          <input
            data-testid="description-input"
            type="text"
            name="descricao-despesa"
            placeholder="Descrição da despesa"
          />
        </label>
        <div>
          <select data-testid="currency-input">
            {currencies.map((item) => (
              <option key={ item.name }>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
