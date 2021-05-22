
// import './sass/main.scss';
import '../sass/main.scss';
import countryCardTpl from '../templates/country-card.hbs'
import API from './api-service';
import getRefs from './get-refs';

const refs = getRefs(); 

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    
    const form = event.currentTarget;
    // console.log(form.elements);
    const searchQuery = form.elements.query.value;

    API.fetchCountryByName(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally(() => form.reset());

}

function renderCountryCard(country) {
    // console.log('this is thennnnnnnnnnnnnnnnn');
        const markup = countryCardTpl(country);
        refs.countryContainer.innerHTML = markup;
    }

    function onFetchError(error) {
        console.log(error);
            alert('Введите коректное название и будет вам страна :)');
    }