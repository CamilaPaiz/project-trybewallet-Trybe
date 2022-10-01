import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRequestApiExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    expensesText: '',
    expensesdescription: '',
    methodinput: 'Dinheiro',
    taginput: 'Alimentação',
    currencyinput: 'USD',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { id,
      expensesText,
      expensesdescription,
      methodinput,
      taginput,
      currencyinput,
    } = this.state;
    const { dispatch } = this.props;
    dispatch(getRequestApiExpenses({
      id,
      value: expensesText,
      description: expensesdescription,
      method: methodinput,
      tag: taginput,
      currency: currencyinput,
    }));
    this.setState({
      expensesText: '',
      expensesdescription: '',
      id: id + 1,
      // zerar restante
    });
  };

  render() {
    const { currencies } = this.props;
    const { expensesText,
      expensesdescription,
      currencyinput,
      taginput,
      methodinput,
    } = this.state;
    return (
      <div>
        <label htmlFor="value-input">
          <input
            data-testid="value-input"
            type="number"
            name="expensesText"
            placeholder="Valor"
            onChange={ this.handleChange }
            value={ expensesText }
          />
        </label>
        <label htmlFor="description-input">
          <input
            data-testid="description-input"
            type="text"
            name="expensesdescription"
            placeholder="Descrição da despesa"
            onChange={ this.handleChange }
            value={ expensesdescription }
          />
        </label>
        <div>
          <select
            data-testid="currency-input"
            onChange={ this.handleChange }
            name="currencyinput"
            value={ currencyinput }
          >
            {currencies.map((item) => (
              <option key={ item.id }>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            data-testid="method-input"
            onChange={ this.handleChange }
            name="methodinput"
            value={ methodinput }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="taginput"
            value={ taginput }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
        <div>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
