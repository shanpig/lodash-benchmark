const Benchmark = require('benchmark');
const isEqual = require('lodash/isEqual');

function benchmark(datasets, lodashFunc, nativeFunc) {
  const stats = {
    lodash: [],
    native: [],
  };

  const logStart = function (data) {
    console.log(`---------- data size: ${data.length} ---------`);
  };

  const logCycle = function (event, data) {
    const lodashResult = lodashFunc(data);
    const nativeResult = nativeFunc(data);

    if (!isEqual(lodashResult, nativeResult)) {
      throw new Error('result is not the same !!');
    }

    console.log(String(event.target));
    console.log('mean run time is ', event.target.stats.mean * 1000, 'ms\n');

    stats[event.target.name].push(event.target.stats.mean * 1000);
  };

  function logComplete(e) {
    console.log(
      `\nFaster function is: ${this.filter('fastest').map('name')}\n`
    );
  }

  datasets.forEach((data) => {
    const suite = new Benchmark.Suite();
    suite
      .add('lodash', () => lodashFunc(data))
      .add('native', () => nativeFunc(data))
      .on('start', () => logStart(data))
      .on('cycle', (e) => logCycle(e, data))
      .on('complete', logComplete)
      .run();
  });

  return { stats };
}

module.exports = { benchmark };
