// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_WALLET, action) {
  switch (action.type) {
  case 'CURRENCIES':
    return { ...state, currencies: action.value };
  case 'EXPENSES':
    return { ...state, expenses: [...state.expenses, action.value] };
  case 'DELETE': {
    const newState = state.expenses;
    return { ...state,
      expenses: newState.filter((item) => (item.id !== parseInt(action.value, 10))) };
  }
  case 'UPDATE': {
    return { ...state, expenses: [...state.expenses, action] };
  }
  default:
    return state;
  }
}

export default walletReducer;
