class FilterCountriesUseCase {
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }

    async execute(animalSearchPattern) {
        const countries = await this.countryRepository.findAll()
        return countries.filter(country => country.people.some(person => person.animals.some(animal => animal.name.includes(animalSearchPattern))))
    }
}

module.exports = {
    FilterCountriesUseCase
}
