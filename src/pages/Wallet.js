import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseAddForm from '../components/ExpenseAddForm';
import LineTableExpense from '../components/LineTableExpense';
import dataAPI from '../services/API';
import { actionWalletCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
    this.addExpense = this.addExpense.bind(this);
    this.lessExpense = this.lessExpense.bind(this);
  }

  componentDidMount() {
    const { setCurrencies, history: { location } } = this.props;
    setCurrencies(dataAPI(), 'currencies');
    if (location.pathname === '/carteira') {
      document.querySelector('.imgWallet').style.display = 'none';
    }
  }

  componentWillUnmount() {
    document.querySelector('.imgWallet').style.display = 'block';
  }

  addExpense(object) {
    const { total } = this.state;
    const valueGasto = object.value;
    const cambio = object.exchangeRates[object.currency].ask;
    const totalConvert = Number((total + (valueGasto * cambio)).toFixed(2));
    this.setState({
      total: totalConvert,
    });
  }

  lessExpense(object) {
    const { total } = this.state;
    const valueGasto = object.value;
    const cambio = object.exchangeRates[object.currency].ask;
    const totalConvert = Number((total - (valueGasto * cambio)).toFixed(2));
    this.setState({
      total: totalConvert,
    });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { total } = this.state;
    return (
      <div className="containerWallet">
        <header>
          <img src="https://image.freepik.com/vetores-gratis/carteira-e-desenho-animado-do-dinheiro_138676-2086.jpg" alt="Wallet" />
          <div>
            <span data-testid="email-field">
              Email:
              {` ${email}`}
            </span>
            <span data-testid="total-field">
              {total}
            </span>
            <span data-testid="header-currency-field">
              BRL
            </span>
          </div>
        </header>
        <ExpenseAddForm currencies={ currencies } addExpense={ this.addExpense } />
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
          <LineTableExpense expenses={ expenses } lessExpense={ this.lessExpense } />
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  setCurrencies: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({ // LER
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: (API, type) => dispatch(actionWalletCurrencies(API, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
