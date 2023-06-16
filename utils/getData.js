function getData(functionName) {
  const baseUrl = window.location.origin + window.location.pathname;
  const href = new URL(
    `benchmarks/${functionName}/${functionName}.json`,
    baseUrl
  ).href;

  return fetch(href).then((res) => res.json());
}
