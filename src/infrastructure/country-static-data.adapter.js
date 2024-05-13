const {data} = require('./data');

class CountryStaticDataAdapter {
    async findAll() {
        return data
    }
}

module.exports = {
    CountryStaticDataAdapter: CountryStaticDataAdapter
}
