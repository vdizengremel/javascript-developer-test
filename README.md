# Javascript developer test

## Solution
### Design choices
#### Code structure
Code is in `src` folder. I separated, in different layers/folders, logic from technical stuff such as fetching data or interacting with console.

`src` folder contains:
- `entrypoint`: contains the code interacting with user. Here it is the part of code responsible to read command line argument and display results.
- `infrastructure`: code to get data to process. This layer could be replaced by another implementation that gets data from a database for instance.
- `usecase`: one class per feature. This layer does not know about other folders. I considered the structure of countries, people and animals as domain model so this layer can know the data structure.


#### Domain folder or not ?
I hesitated creating a domain folder to leave only orchestration in use cases, but I felt it was a little too much here.
It would be interesting for a feature that cumulates features like filtering before counting, but I think it was too soon.
In typescript, I would have put type definitions in folder to document data structure and a `CountryRepository` interface that would have been implemented in infrastructure layer.

#### Count calculation
I chose to add a calculated attribute to returned data by count use case.
This allows to change the render of the count without impacting use case.

### Tests
Tests can be run with: `npm test`.

There are two kinds of test:
- tests in `entrypoint` that test the overall by reading the given `data.js`.
- use case tests that tests a particular aspect of a feature


## Filter

Your job is to write a command-line interface in Node.js. 
This program has to filter a list of elements containing a pattern.

Details:
- In the following file `data.js`, there are `Countries` containing `Peoples` containing `Animals`.
- Only animals containing the pattern passed as argument (e.g. `ry`) are displayed. The order should be kept intact.
- Empty array after filtering are NOT returned.

Sample of running the command, and its output:

```shell script
$ node app.js --filter=ry
[
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
]
```

## Count

The next goal is to print the counts of People and Animals by counting the number of children and appending it in the name, eg. `Satanwi [2]`.

Sample of running the command, and its output:

```shell script
node app.js --count
[ { name: 'Dillauti [5]',
    people:
     [ { name: 'Winifred Graham [6]',
         animals:
          [ { name: 'Anoa' },
            { name: 'Duck' },
            { name: 'Narwhal' },
            { name: 'Badger' },
            { name: 'Cobra' },
            { name: 'Crow' } ] },
       { name: 'Blanche Viciani [8]',
         animals:
          [ { name: 'Barbet' },
            { name: 'Rhea' },
            { name: 'Snakes' },
            { name: 'Antelope' },
            { name: 'Echidna' },
            { name: 'Crow' },
            { name: 'Guinea Fowl' },
            { name: 'Deer Mouse' } ] },
      ...
...
]
```

## Requirements

- The code must be available in a GIT repository
- No library/modules should be used, except for the testing library

## Appreciation

We will be really attentive to:

- Code readability, structure and consistency
- Tests, and how they are written
