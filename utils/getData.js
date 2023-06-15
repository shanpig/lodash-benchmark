function getData(functionName) {
  const baseUrl = window.location.origin + window.location.pathname;
  return fetch(
    `${baseUrl}benchmarks/${functionName}/${functionName}.json`
  ).then((res) => res.json());
}
