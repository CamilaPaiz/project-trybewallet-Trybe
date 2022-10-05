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
        <p
          className="header-email"
          data-testid="email-field"
        >
          {email}

        </p>
        <div>
          <p
            className="total-field"
            data-testid="total-field"
          >
            { this.sumCalculation() }

          </p>
        </div>

        <p
          className="header-currency-field"
          data-testid="header-currency-field"
        >
          BRL

        </p>

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

// requisito 4 realizado com ajuda do colega Felipe Pinto
