const uniq = require('lodash/uniq');
const path = require('path');
const { faker } = require('@faker-js/faker');
const { benchmark } = require('../../utils/benchmark');
const { writeToJson } = require('../../utils/writeToJson');
const { dataSizes } = require('../../utils/constants');

const data = dataSizes.map((dataSize) =>
  Array.from({ length: dataSize }, () => faker.number.int())
);

const lodashFunc = (array) => uniq(array);
const nativeFunc = (array) => Array.from(new Set(array));

const { stats } = benchmark(data, lodashFunc, nativeFunc);

writeToJson(path.join(__dirname, 'uniq.json'), {
  dataSizes,
  stats,
});
