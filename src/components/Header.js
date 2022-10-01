import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumCalculation = () => {
    let sum = 0;
    const { expenses } = this.props;
    expenses.forEach((expense) => {
      const valueExpense = expense.value;
      const rate = expense.exchangeRates[expense.currency].ask;
      const finalValue = Number(valueExpense) * Number(rate);
      sum += finalValue;
    });
    return sum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <div>
          <p data-testid="total-field">
            { this.sumCalculation() }

          </p>
        </div>
        <div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
