import axios from "axios";

async function getCountries() {
    try {

        // Step 1: Get country name
        const inputField = document.getElementById("country-input");
        const countryName = inputField.value;
        const result = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        const countryInformation = result.data[0];

        console.log(countryInformation)

        // Step 2: Destructure the object for required values
        const { flags: {png: flag, alt}, name: { common: name }, currencies, subregion, population, capital, languages } = countryInformation;

        const currencyString = getAllCurrenciesString(currencies);
        const languageString = getAllLanguagesString(languages);

        // Step 3: Refer to HTML Element
        const countryElement = document.getElementById("country-article");

        // Step 4: Add information to the element
        countryElement.innerHTML = `
            <div class="country-title">
                <img src=${flag} alt=${alt}>
                <h2>${name}</h2>
            </div>
            
            <div class="divider"></div>
            
            <article
             class="country-information">
                <p>${name} is situated in ${subregion}. It has a population of ${population} people.</p>
                <p>The capital is ${capital} ${currencyString}</p>
                <p>They speak ${languageString}</p>
            </article>
        `

        // Step 5: Clear search bar
        inputField.value = "";
    }
    catch ( e ) {
        const countryElement = document.getElementById("country-article");

        countryElement.innerHTML = `
            <p>Dit land bestaat niet</p>
        `
        console.error(e);
    }
}

// Function for getting country currencies
function getAllCurrenciesString(currencies) {
    const currencyArray = [];

    if (!currencies) {
        return "and this country has no currencies."
    }

    Object.keys(currencies).forEach((key) => {
        currencyArray.push(Object.values(currencies[key])[0]);
    })

    let currencyString = `and you can pay with ${currencyArray[0]}'s`

    if (currencyArray.length > 1) {
        for (let i = 1; i < currencyArray.length; i++) {
            currencyString += ` and ${currencyArray[i]}'s`
        }
    }

    currencyString += ".";

    return currencyString;
}

// Function for getting country languages
function getAllLanguagesString(languages) {
    const languageArray = [];

    if (!languages) {
        return "no known language.";
    }

    Object.keys(languages).forEach((key) => {
        languageArray.push(languages[key]);
    })

    let languageString = `${languageArray[0]}`

    if (languageArray.length > 1) {
        for (let i = 1; i < languageArray.length; i++) {
            languageString += ` and ${languageArray[i]}`
        }
    }

    languageString += ".";

    return languageString;
}

// Create a form listener
const form = document.getElementById("country-search");

form.addEventListener("submit", getCountries);