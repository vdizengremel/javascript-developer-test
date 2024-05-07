const app = require('./app');

describe('App', () => {
    beforeEach(() => {
        jest.spyOn(global.console, 'log')
    })

    it('should display countries with animals corresponding to filter', async () => {
        await app(['node', 'app.js', '--filter=ry'])
        expect(console.log).toHaveBeenCalledWith([
            {
                name: 'Uzuzozne',
                people: [
                    {
                        name: 'Lillie Abbott',
                        animals: [
                            {
                                name: 'John Dory'
                            }
                        ]
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
    })
})
