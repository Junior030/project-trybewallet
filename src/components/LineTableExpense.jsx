import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionDeleteExpenses } from '../actions';

class LineTableExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.delExpenses = this.delExpenses.bind(this);
    this.editDespesa = this.editDespesa.bind(this);
  }

  delExpenses({ target }) {
    const listTR = document.querySelectorAll('tr');
    const { deleteExpenses } = this.props;
    listTR.forEach((linhaTR) => {
      if (linhaTR.id === target.value) {
        deleteExpenses(linhaTR.id, 'delete');
      }
    });
  }

  editDespesa(gastos) {
    const e = {};
    const chaves = Object.keys(gastos);
    const form = document.querySelector('#formExpense');
    chaves.forEach((chave) => {
      form.childNodes.forEach((label) => {
        if (chave === label.htmlFor) {
          label.lastChild.value = gastos[chave];
          e[chave] = gastos[chave];
        }
      });
    });
  }

  render() {
    const { expenses, lessExpense } = this.props;
    if (expenses.length > 0) {
      return (
        <tbody>
          {expenses.map((gastos) => (
            <tr key={ gastos.id } id={ gastos.id }>
              <td>{gastos.description}</td>
              <td>{gastos.tag}</td>
              <td>{gastos.method}</td>
              <td>{gastos.value}</td>
              <td>{gastos.exchangeRates[gastos.currency].name}</td>
              <td>{(gastos.exchangeRates[gastos.currency].ask * 1).toFixed(2)}</td>
              <td>
                {(gastos
                  .value * gastos.exchangeRates[gastos.currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  value={ gastos.id }
                  onClick={ (e) => {
                    this.editDespesa(gastos);
                    this.delExpenses(e);
                    lessExpense(gastos);
                  } }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  value={ gastos.id }
                  onClick={ (e) => {
                    this.delExpenses(e);
                    lessExpense(gastos);
                  } }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      );
    }
    return null;
  }
}

LineTableExpense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteExpenses: PropTypes.func.isRequired,
  lessExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (value, type) => dispatch(actionDeleteExpenses(value, type)),
});

export default connect(null, mapDispatchToProps)(LineTableExpense);
