class FilterUseCase {
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }

    async execute(animalSearchPattern) {
        const countries = await this.countryRepository.findAll()
        const countriesWithOnlyPeopleAndTheirAnimalsMatchingPattern = this.#keepOnlyPeopleAndTheirAnimalMatchingPattern(countries, animalSearchPattern)

        return this.#filterCountriesWithOnlyPeopleLeftMathingPattern(countriesWithOnlyPeopleAndTheirAnimalsMatchingPattern)
    }

    #keepOnlyPeopleAndTheirAnimalMatchingPattern(countries, animalSearchPattern) {
        return countries.map(country => ({
            name: country.name,
            people: this.#filterPeopleHavingAnimalMatching(country.people, animalSearchPattern)
        }));
    }

    #filterCountriesWithOnlyPeopleLeftMathingPattern(countriesWithOnlyPeopleAndTheirAnimalsMatchingPattern) {
        return countriesWithOnlyPeopleAndTheirAnimalsMatchingPattern.filter(country => country.people.length);
    }

    #filterPeopleHavingAnimalMatching(people, animalSearchPattern) {
        const filteredPeople = people.map(person => ({
            name: person.name,
            animals: this.#filterAnimalMatching(person.animals, animalSearchPattern)
        }))

        return filteredPeople.filter(person => person.animals.length)
    }

    #filterAnimalMatching(animals, animalSearchPattern) {
        return animals.filter(animal => animal.name.includes(animalSearchPattern));
    }
}

module.exports = {
    FilterCountriesUseCase: FilterUseCase
}
