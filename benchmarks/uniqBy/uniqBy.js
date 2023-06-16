const uniqBy = require('lodash/uniqBy');
const path = require('path');
const { faker } = require('@faker-js/faker');
const { benchmark } = require('../../utils/benchmark');
const { writeToJson } = require('../../utils/writeToJson');
const { dataSizes } = require('../../utils/constants');

const data = dataSizes.map((dataSize) =>
  Array.from({ length: dataSize }, () => ({ number: faker.number.int() }))
);

const lodashFunc = (array) => uniqBy(array, 'number');
const nativeFunc = (array) => {
  return Array.from(
    array
      .reduce((acc, cur) => {
        const key = cur['number'];
        if (!acc.has(key)) {
          acc.set(key, cur);
        }
        return acc;
      }, new Map())
      .values()
  );
};

const { stats } = benchmark(data, lodashFunc, nativeFunc);

writeToJson(path.join(__dirname, 'uniqBy.json'), {
  dataSizes,
  stats,
});
