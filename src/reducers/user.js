// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_USER = {
  email: '',
  password: '',
};

function userReducer(state = INITIAL_USER, action) {
  switch (action.type) {
  case 'EMAIL':
    return { ...state, email: action.value };
  case 'PASSWORD':
    return { ...state, password: action.value };
  default:
    return state;
  }
}

export default userReducer;
