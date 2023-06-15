const { faker } = require('@faker-js/faker');
const { benchmark } = require('../../utils/benchmark');
const { writeToJson } = require('../../utils/writeToJson');
const { dataSizes } = require('../../utils/constants');
const path = require('path');
const sortBy = require('lodash/sortBy');

const data = dataSizes.map((dataSize) =>
  Array.from({ length: dataSize }, () => ({ number: faker.number.int() }))
);

const lodashFunc = (array) => sortBy(array, 'number');
const nativeFunc = (array) => array.sort((a, b) => a.number - b.number);

const { stats } = benchmark(data, lodashFunc, nativeFunc);

writeToJson(path.join(__dirname, 'sortBy.json'), {
  dataSizes,
  stats,
});
