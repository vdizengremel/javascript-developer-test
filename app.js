const { FilterCountriesUseCase } = require('./usecase/filter-countries.usecase')
const { CountryRepository } = require('./infrastructure/country-repository')

async function app(args) {
    const animalSearchTerm = args[2].replace('--filter=', '')

    const filterCountriesUseCase = new FilterCountriesUseCase(new CountryRepository())
    const filteredCountries = await filterCountriesUseCase.execute(animalSearchTerm)
    console.log(filteredCountries)

}

module.exports = app
app(process.argv).then(() => {
    console.log('App finished')
})
