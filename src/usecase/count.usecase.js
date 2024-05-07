class CountUseCase {
    constructor(countryRepository) {
        this.countryRepository = countryRepository;
    }

    async execute() {
        const countries = await this.countryRepository.findAll()

        return countries.map(country => {
            return {
                name: country.name,
                peopleCount: country.people.length,
                people: country.people.map(person => ({
                    name: person.name,
                    animalsCount: person.animals.length,
                    animals: person.animals
                }))
            }
        })
    }
}

module.exports = {
    CountUseCase
}
