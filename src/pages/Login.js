import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionUser } from '../actions';

// https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469
// Usado essa fonte para conhecimento em regex
const validForm = (email, password) => {
  const SEIS = 6;
  const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  const button = document.querySelector('button');
  if ((regex.test(email)) && (password.length >= SEIS)) {
    button.disabled = false;
  } else { button.disabled = true; }
};

class Login extends React.Component {
  componentDidMount() {
    const { email, password } = this.props;
    validForm(email, password);
  }

  componentDidUpdate() {
    const { email, password } = this.props;
    validForm(email, password);
  }

  render() {
    const { setUser } = this.props;
    return (
      <div className="containerLogin">
        <img src="https://image.freepik.com/vetores-gratis/carteira-e-desenho-animado-do-dinheiro_138676-2086.jpg" alt="Wallet" />
        <h1>
          TrybeWallet
        </h1>
        <form>
          <label htmlFor="email">
            <input
              placeholder=" E-mail"
              type="email"
              id="email"
              onChange={ (e) => setUser(e.target.value, e.target.id) }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            <input
              placeholder="Senha"
              type="password"
              id="password"
              data-testid="password-input"
              onChange={ (e) => setUser(e.target.value, e.target.id) }
            />
          </label>
          <Link to="/carteira">
            <button
              type="submit"
              data-testid="my-action"
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ // GET
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({ // SET
  setUser: (value, type) => dispatch(actionUser(value, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
