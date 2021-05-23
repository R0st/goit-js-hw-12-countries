
var debounce = require('lodash.debounce');
const { error } = require('@pnotify/core');

import '@pnotify/core/dist/BrightTheme.css';
import '../style.css';
import countryCardTpl from '../templates/country-card.hbs';
import countriesList from '../templates/countriesList.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';
const refs = getRefs(); 
    
refs.searchForm.addEventListener('input', debounce(onSearch, 500));
// refs.searchForm.addEventListener('input', onSearch);

function onSearch(event) {
    // event.preventDefault();
    clearContainer();
    const searchQuery = event.target.value;

    API.fetchCountries(searchQuery)
        .then(countries => {
            if (countries.length > 10) {
                error({
                    text: 'Too many matches found. Please enter a more specific query!',
                    maxTextHeight: '100px',
                    delay: 2000,
                    closer: true,
                    sticker: false,
                    icon: false,
                });
                return;
            } if (countries.length>=2 && countries.length <= 10) {
                renderCountriesList(countries);
                return;
            } if (countries.length === 1) {
                 return renderCountryCard(countries);
            }
        })
        .catch(onFetchError);
}

function renderCountryCard(countries) {
    const markup = countryCardTpl(countries);
    refs.countryContainer.innerHTML = markup;
}
    
function renderCountriesList(countries) {
    const markupList = countriesList(countries);
    refs.countryContainer.innerHTML = markupList;
}

function onFetchError() {
    error ({
        text: 'Error by fetch',
        delay: 2000,
        closer: true,
        sticker: false,
        icon: false,
    });
}
    
function clearContainer() {
    refs.countryContainer.innerHTML = '';
}