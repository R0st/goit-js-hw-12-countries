const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}`)
        .then(response => {
            // console.log(response);
            if (response.ok) return response.json();
            throw new Error('Error by fetch');
    })
}

export default { fetchCountries };
