const {data} = require('./data');

class CountryRepository {
    async findAll() {
        return data
    }
}

module.exports = {
    CountryRepository
}
