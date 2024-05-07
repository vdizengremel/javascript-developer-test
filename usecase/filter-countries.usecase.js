class FilterCountriesUseCase {
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }

    async execute(animalSearchPattern) {
        const countries = await this.countryRepository.findAll()
        countries.forEach(country => this.#keepPeopleHavingAnimalMatching(country, animalSearchPattern))

        return countries.filter(country => country.people.length)
    }

    #keepPeopleHavingAnimalMatching(country, animalSearchPattern) {
        country.people.forEach(person => this.#keepAnimalMatching(person, animalSearchPattern));
        country.people = country.people.filter(person => person.animals.length)
    }

    #keepAnimalMatching(person, animalSearchPattern) {
        person.animals = person.animals.filter(animal => animal.name.includes(animalSearchPattern));
    }
}

module.exports = {
    FilterCountriesUseCase
}
