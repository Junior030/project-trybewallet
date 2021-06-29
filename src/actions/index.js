// Coloque aqui suas actions
export function actionUser(value, type) {
  return {
    type: type.toUpperCase(),
    value,
  };
}

export function actionWalletCurrencies(API, type) {
  return (dispatch) => {
    API.then((resposta) => {
      const array = Object.keys(resposta);
      array.splice(1, 1);
      dispatch({ type: type.toUpperCase(), value: array });
    });
  };
}

export function actionExpenses(API, state, type, add) {
  return (dispatch) => {
    API.then((exchangeRates) => {
      const object = { ...state, exchangeRates };
      dispatch({ type: type.toUpperCase(), value: object });
      add(object);
    });
  };
}

export function actionDeleteExpenses(value, type) {
  return { type: type.toUpperCase(), value };
}

export function actionUpdateExpenses(value, type) {
  return { type: type.toUpperCase(), value };
}
