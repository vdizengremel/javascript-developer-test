const { FilterCountriesUseCase } = require('./filter.usecase')

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

    it('should return in countries only animals whose name includes pattern', async () => {
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
                            },
                            {
                                name: 'another animal that does not match pattern'
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

    it('should not mutate repository data', async () => {
        let repositoryData = [
            {
                name: 'Dillauti',
                people: [
                    {
                        name: 'Winifred Graham',
                        animals: [{name: 'Anoa'}]
                    }
                ]
            }
        ];
        countryRepositoryMock.findAll.mockResolvedValue(repositoryData)

        await filterCountriesUseCase.execute('ry');

        expect(repositoryData).toEqual([
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
    })
})
