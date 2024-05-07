class FilterCountriesUseCase {
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }

    async execute(animalSearchPattern) {
        const countries = await this.countryRepository.findAll()
        return countries.filter(country => this.#isCountryContainingAnimalMatching(country, animalSearchPattern))
    }

    #isCountryContainingAnimalMatching(country, animalSearchPattern) {
        return country.people.some(person => this.#doesPersonHaveAnimalMatching(person, animalSearchPattern));
    }

    #doesPersonHaveAnimalMatching(person, animalSearchPattern) {
        return person.animals.some(animal => animal.name.includes(animalSearchPattern));
    }
}

module.exports = {
    FilterCountriesUseCase
}
