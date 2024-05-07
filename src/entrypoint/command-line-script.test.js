const {run} = require('./command-line-script');

describe('App', () => {
    beforeEach(() => {
        jest.spyOn(global.console, 'dir')
    })

    describe('when passing filter argument', () => {
        it('should display countries with animals corresponding to filter', async () => {
            await run(['node', 'app.js', '--filter=ry'])

            expect(console.dir).toHaveBeenCalledWith([{
                    name: 'Uzuzozne', people: [{
                        name: 'Lillie Abbott', animals: [{
                            name: 'John Dory'
                        }]
                    }]
                }, {
                    name: 'Satanwi', people: [{
                        name: 'Anthony Bruno', animals: [{
                            name: 'Oryx'
                        }]
                    }]
                }],
                {depth: 5}
            )
        })
    })


    describe('when passing count argument', () => {
        it('should display countries and people with count', async () => {
            await run(['node', 'app.js', '--count'])

            const lastCall = console.dir.mock.lastCall
            const lastCallElement = lastCall[0];
            expect(lastCallElement[0].name).toEqual('Dillauti [5]')
        })
    })
})
