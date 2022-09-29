import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="email-field">{email}</p>
        <div>
          <p data-testid="total-field">0</p>
        </div>
        <div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
