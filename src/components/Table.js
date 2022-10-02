import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletedTableItem } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { expenses, dispatch } = this.props;
    const filter = expenses.filter((item) => item.id !== id);
    dispatch(deletedTableItem(filter));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div id="table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>

            {
              expenses.map((item) => {
                const valueInput = Number(item.value);
                const valueInputFixed = valueInput.toFixed(2);
                const exchangeRate = Number(item.exchangeRates[item.currency].ask)
                 * Number(item.value);
                const exchangeRateFixed = exchangeRate.toFixed(2);

                const currencyInput = Number(item.exchangeRates[item.currency].ask);
                const currencyInputFixed = currencyInput.toFixed(2);

                return (
                  <tr key={ item.id }>
                    <td>{item.description}</td>
                    <td>{item.tag}</td>
                    <td>{item.method}</td>
                    <td>{valueInputFixed}</td>
                    <td>{item.exchangeRates[item.currency].name}</td>
                    <td>{ exchangeRateFixed }</td>
                    <td>{ currencyInputFixed}</td>
                    <td>Real</td>
                    <td>
                      {/* <button
                        data-testid="edit-btn"
                        type="button"
                      >
                        Editar
                      </button> */}
                      <button
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
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
