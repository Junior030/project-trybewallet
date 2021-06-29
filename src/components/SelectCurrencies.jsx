import PropTypes from 'prop-types';
import React from 'react';

class SelectCurrencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { currencies, Select } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select id="currency" onChange={ Select }>
          <option value=""> </option>
          {currencies.map((moeda) => (
            <option value={ moeda } key={ moeda }>{ moeda }</option>
          ))}
        </select>
      </label>
    );
  }
}

SelectCurrencies.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  Select: PropTypes.func.isRequired,
};

export default SelectCurrencies;
