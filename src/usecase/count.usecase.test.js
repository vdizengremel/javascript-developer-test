const {CountUseCase} = require('./count.usecase')

describe('count', () => {
    let countUseCase

    let countryRepositoryMock

    beforeEach(() => {
        countryRepositoryMock = {
            findAll: jest.fn()
        }

        countUseCase = new CountUseCase(countryRepositoryMock)
    })

    it('should count countries and animals', async () => {
        countryRepositoryMock.findAll.mockResolvedValue([
            {
                name: 'Dillauti',
                people: [
                    {
                        name: 'Winifred Graham',
                        animals: [
                            {name: 'Anoa'},
                            {name: 'Duck'},
                            {name: 'Narwhal'},
                        ]
                    }
                ]
            }
        ])

        const countResult = await countUseCase.execute()

        expect(countResult).toEqual([
            {
                name: 'Dillauti',
                peopleCount: 1,
                people: [
                    {
                        name: 'Winifred Graham',
                        animalsCount: 3,
                        animals: [
                            {name: 'Anoa'},
                            {name: 'Duck'},
                            {name: 'Narwhal'},
                        ]
                    }
                ]
            }
        ])
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

        await countUseCase.execute();

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
