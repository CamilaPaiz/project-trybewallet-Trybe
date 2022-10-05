import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletedTableItem, editTable } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { expenses, dispatch } = this.props;
    const filter = expenses.filter((item) => item.id !== id);
    dispatch(deletedTableItem(filter));
  };

  handleEditClick = (id) => {
    const { dispatch } = this.props;

    dispatch(editTable(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-wallet">
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="descricao">Descrição</th>
              <th className="tag">Tag</th>
              <th className="method">Método de pagamento</th>
              <th className="valor">Valor</th>
              <th className="moeda">Moeda</th>
              <th className="cambio">Câmbio utilizado</th>
              <th className="valor-convertido">Valor convertido</th>
              <th className="moeda-conversao">Moeda de conversão</th>
              <th className="editar-excluir">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>

            {
              expenses.map((item) => {
                console.log(item);
                const valueInput = Number(item.value);
                const valueInputFixed = valueInput.toFixed(2);
                const exchangeRate = Number(item.exchangeRates[item.currency].ask)
                 * Number(item.value);
                const exchangeRateFixed = exchangeRate.toFixed(2);

                const currencyInput = Number(item.exchangeRates[item.currency].ask);
                const currencyInputFixed = currencyInput.toFixed(2);

                return (
                  <tr className="expenses-table" key={ item.id }>
                    <td className="descrip-item">{item.description}</td>
                    <td className="tag-item">{item.tag}</td>
                    <td className="method-item">{item.method}</td>
                    <td className="value-item">{valueInputFixed}</td>
                    <td className="moeda-item">
                      {item.exchangeRates[item.currency].name}

                    </td>
                    <td className="exchangerate-item">{ exchangeRateFixed }</td>
                    <td className="currencyinput-item">{ currencyInputFixed}</td>
                    <td className="real">Real</td>
                    <td className="buttons">
                      <button
                        className="edita-button"
                        data-testid="edit-btn"
                        type="button"
                        onClick={ () => this.handleEditClick(item.id) }
                      >
                        Editar
                      </button>
                      <button
                        className="exclui-button"
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => this.handleClick(item.id) }
                      >
                        Excluir

                      </button>
                    </td>
                  </tr>
                );
              })

            }

          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  idToEdit: wallet.idToEdit,
  editor: wallet.editor,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
