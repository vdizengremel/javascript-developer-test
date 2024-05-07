const {FilterCountriesUseCase} = require('./filter-countries.usecase')

describe('FilterCountriesUseCase', () => {
    let filterCountriesUseCase

    let countryRepositoryMock

    beforeEach(() => {
        countryRepositoryMock = {
            findAll: jest.fn()
        }
        filterCountriesUseCase = new FilterCountriesUseCase(countryRepositoryMock);
    })

    it('should return empty array when no country have animal matching pattern', async () => {
        countryRepositoryMock.findAll.mockResolvedValue([
            {
                name: 'Dillauti',
                people: [
                    {
                        name: 'Winifred Graham',
                        animals: [{name: 'Anoa'}]
                    }
                ]
            }
        ])

        const filteredCountries = await filterCountriesUseCase.execute('ry');

        expect(filteredCountries).toEqual([])
    })

    it('should return countries having animal name including pattern', async () => {
        countryRepositoryMock.findAll.mockResolvedValue([
            {
                name: 'Dillauti',
                people: [
                    {
                        name: 'Winifred Graham',
                        animals: [{name: 'Anoa'}]
                    }
                ]
            },
            {
                name: 'Satanwi',
                people: [
                    {
                        name: 'Anthony Bruno',
                        animals: [
                            {
                                name: 'Oryx'
                            }
                        ]
                    }
                ]
            }
        ])

        const filteredCountries = await filterCountriesUseCase.execute('ry');

        expect(filteredCountries).toEqual([{
            name: 'Satanwi',
            people: [
                {
                    name: 'Anthony Bruno',
                    animals: [
                        {
                            name: 'Oryx'
                        }
                    ]
                }
            ]
        }])
    })
})
