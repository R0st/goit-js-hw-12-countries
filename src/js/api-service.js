const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountryByName(countryName) {
    return fetch(`${BASE_URL}/name/${countryName}`)
        .then(response => {
            console.log(response);
            if (response.ok) return response.json();
            throw new Error('Error by fetch');
    })
}

export default { fetchCountryByName };
