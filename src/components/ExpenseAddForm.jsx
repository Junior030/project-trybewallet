import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionExpenses, actionUpdateExpenses } from '../actions';
import SelectCurrencies from './SelectCurrencies';
import dataAPI from '../services/API';

class ExpenseAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  Change({ target }) {
    const { state } = this;
    this.setState({
      ...state, [target.id]: target.value,
    });
  }

  Select({ target }) {
    const { state } = this;
    this.setState({
      ...state, [target.id]: target.options[target.selectedIndex].value,
    });
  }

  controlForm(e, bool) {
    e.preventDefault();
    const { Expenses, addExpense, updateExpenses } = this.props;
    if (!bool) {
      const { id } = this.state;
      this.setState({
        id: id + 1,
      });
      document.getElementById('formExpense').reset();
      Expenses(dataAPI(), this.state, 'expenses', addExpense);
    } else {
      updateExpenses(e, 'update');
    }
  }

  render() {
    const { currencies } = this.props;
    return (
      <form method="get" id="formExpense">
        <label htmlFor="value">
          Valor
          <input
            type="number"
            id="value"
            step="0.01"
            onChange={ (e) => this.Change(e) }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" id="description" onChange={ (e) => this.Change(e) } />
        </label>
        <SelectCurrencies currencies={ currencies } Select={ (e) => this.Select(e) } />
        <label htmlFor="method">
          Método de pagamento
          <select id="method" onChange={ (e) => this.Select(e) }>
            <option value=""> </option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" onChange={ (e) => this.Select(e) }>
            <option value=""> </option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ (e) => {
            this.controlForm(e, false);
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
ExpenseAddForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  Expenses: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  Expenses: (API, state, type, add) => dispatch(actionExpenses(API, state, type, add)),
  updateExpenses: (value, type) => dispatch(actionUpdateExpenses(value, type)),
});

export default connect(null, mapDispatchToProps)(ExpenseAddForm);
