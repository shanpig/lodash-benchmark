const intersection = require('lodash/intersection');
const { faker } = require('@faker-js/faker');
const { benchmark } = require('../../utils/benchmark');
const { writeToJson } = require('../../utils/writeToJson');
const { dataSizes } = require('../../utils/constants');
const path = require('path');

const data = dataSizes.map((dataSize) => [
  Array.from({ length: dataSize }, () => faker.number.int()),
  Array.from({ length: dataSize }, () => faker.number.int()),
]);

const lodashFunc = ([randomLargeArray1, randomLargeArray2]) =>
  intersection(randomLargeArray1, randomLargeArray2);
const nativeFunc = ([randomLargeArray1, randomLargeArray2]) =>
  randomLargeArray1.filter((item) => randomLargeArray2.includes(item));

const { stats } = benchmark(data, lodashFunc, nativeFunc);

writeToJson(path.join(__dirname, 'intersection.json'), {
  dataSizes,
  stats,
});
