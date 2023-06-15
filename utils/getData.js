function getData(functionName) {
  return fetch(`../benchmarks/${functionName}/${functionName}.json`).then(
    (res) => res.json()
  );
}
