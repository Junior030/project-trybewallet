export default async function fetchCurrency() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
}
