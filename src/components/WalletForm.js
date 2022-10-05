import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRequestApiExpenses, editFinished, getRequestApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    expensesText: '',
    expensesdescription: '',
    methodinput: 'Dinheiro',
    taginput: 'Alimentação',
    currencyinput: 'USD',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getRequestApi());
  }

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
    const { dispatch, editor } = this.props;
    if (!editor) {
      dispatch(getRequestApiExpenses({
        id,
        value: expensesText,
        description: expensesdescription,
        method: methodinput,
        tag: taginput,
        currency: currencyinput,
      }));
    } else {
      console.log('entrou no editar');
      dispatch(editFinished({
        value: expensesText,
        description: expensesdescription,
        method: methodinput,
        tag: taginput,
        currency: currencyinput,
      }));
    }
    this.setState({
      expensesText: '',
      expensesdescription: '',
      id: id + 1,
      // zerar restante
    });
  };

  /* handleEditClick = (idItem) => {
    const { editingId, dispatch } = this.props;
    const editableTable = editingId.filter((editableItem) => editableItem.id === idItem);
    dispatch(editTable(editableTable));
  }; */

  render() {
    const { currencies, editor } = this.props;
    const { expensesText,
      expensesdescription,
      currencyinput,
      taginput,
      methodinput,
    } = this.state;
    return (
      <div className="form-header-box">
        <div className="form-content">
          <label
            className="value-input-label"
            htmlFor="value-input"
          >
            Valor
            <input
              className="value-input"
              data-testid="value-input"
              type="number"
              name="expensesText"
              onChange={ this.handleChange }
              value={ expensesText }
            />
          </label>
          <label
            className="description-input-label"
            htmlFor="description-input"
          >
            Descrição de despesas
            <input
              className="description-input"
              data-testid="description-input"
              type="text"
              name="expensesdescription"
              onChange={ this.handleChange }
              value={ expensesdescription }
            />
          </label>
          <label
            className="currency-input-label"
            htmlFor="currency-input"
          >
            Moeda
            <select
              className="currency-input"
              data-testid="currency-input"
              onChange={ this.handleChange }
              name="currencyinput"
              value={ currencyinput }
            >
              {currencies.map((item, index) => (
                <option key={ index } value={ item }>{item}</option>
              ))}
            </select>
          </label>
          <label
            className="method-input-label"
            htmlFor="method-input"
          >
            Método de pagamento
            <select
              className="method-input"
              data-testid="method-input"
              onChange={ this.handleChange }
              name="methodinput"
              value={ methodinput }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label
            className="tag-input-label"
            htmlFor="tag-input"

          >
            Categoria de despesas
            <select
              className="tag-input"
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
          </label>

          <div>
            {
              !editor
                ? (
                  <button
                    className="add-button"
                    type="button"
                    onClick={ this.handleClick }
                  >
                    Adicionar despesa
                  </button>
                )
                : (
                  <button
                    className="add-button"
                    type="button"
                    onClick={ this.handleClick }
                  >
                    Editar despesa
                  </button>
                )
            }

          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
