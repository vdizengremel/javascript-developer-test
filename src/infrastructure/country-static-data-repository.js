const {data} = require('./data');

class CountryStaticDataRepository {
    async findAll() {
        return data
    }
}

module.exports = {
    CountryStaticDataRepository: CountryStaticDataRepository
}
