const {FilterCountriesUseCase} = require('../usecase/filter-countries.usecase')
const {CountUseCase} = require('../usecase/count.usecase')
const {CountryStaticDataRepository} = require('../infrastructure/country-static-data-repository')

async function run(args) {
    const arg = args[2];

    if (arg.includes('--filter=')) {
        const animalSearchTerm = arg.replace('--filter=', '')

        const filterCountriesUseCase = new FilterCountriesUseCase(new CountryStaticDataRepository())
        const filteredCountries = await filterCountriesUseCase.execute(animalSearchTerm)
        displayResult(filteredCountries)
    } else {
        const countUseCase = new CountUseCase(new CountryStaticDataRepository())
        const countResult = await countUseCase.execute()
        displayResult(putCountsInNames(countResult))
    }
}

function putCountsInNames(countedCountries) {
    return countedCountries.map(country => ({
        name: mergeNameAndCount(country.name, country.peopleCount),
        people: country.people.map(person => ({
            name: mergeNameAndCount(person.name, person.animalsCount),
            animals: person.animals
        }))
    }))
}

function mergeNameAndCount(name, count) {
    return `${name} [${count}]`;
}

function displayResult(result) {
    console.dir(result, {depth: 5})
}

module.exports = {
    run
}
