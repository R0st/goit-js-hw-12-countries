
var debounce = require('lodash.debounce');
// const { error } = require('@pnotify/core');
import { error } from '@pnotify/core';
// import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';
// import { render } from 'sass';
// import './sass/main.scss';
import '../style.css';
import countryCardTpl from '../templates/country-card.hbs';
import countriesList from '../templates/countriesList.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';
const refs = getRefs(); 
    
refs.searchForm.addEventListener('input', debounce(onSearch, 500));
// refs.searchForm.addEventListener('input', onSearch);

function onSearch(event) {
    event.preventDefault();
    clearContainer();
    const searchQuery = event.target.value;

    API.fetchCountries(searchQuery)
        .then(countries => {
            if (countries.length > 10) {
                error({
                    text: 'Too many matches found. Please enter a more specific query!',
                });
            } else if (1< countries.length <= 10) {
                 renderCountriesList(countries);
            } else if (countries.length === 1) {
                 renderCountryCard(countries);
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

function onFetchError(error) {
    console.log(error);
    // alert('Введите коректное название и будет вам страна :)');
}
    
function clearContainer() {
    refs.countryContainer.innerHTML = '';
}