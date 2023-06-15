// according to data, construct a table for rendering on html
function constructTable(data) {
  const { dataSizes, stats } = data;
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');

  ['', ...dataSizes].forEach((size) => {
    const th = document.createElement('th');
    th.textContent = size;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  table.appendChild(thead);

  Object.keys(stats).forEach((funcName) => {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = funcName;
    tr.appendChild(td);

    stats[funcName].forEach((time) => {
      const td = document.createElement('td');
      const truncatedTime = time.toFixed(4);
      td.textContent = `${truncatedTime} s`;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  return table;
}
