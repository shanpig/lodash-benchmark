function constructGraph(data, ctx) {
  const { dataSizes, stats } = data;

  const barColors = {
    lodash: 'rgb(52, 146, 255)',
    native: 'rgb(255, 215, 0)',
  };

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataSizes.map((size) => size),
      datasets: Object.entries(stats).map(([name, values]) => ({
        label: name,
        data: values,
        backgroundColor: barColors[name],
      })),
    },
    options: {
      plugins: {
        title: { display: true, text: 'lodash vs native' },
        annotation: {
          annotations: [
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y',
              value: 0.5,
              borderColor: 'tomato',
              borderWidth: 1,
            },
          ],
          drawTime: 'afterDraw', // (default)
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'data size',
          },
        },
        y: {
          max: 10,
          beginAtZero: true,
          title: {
            display: true,
            text: 'time',
          },
          ticks: {
            callback: (value) => {
              return value + 'ms';
            },
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
        },
        legendCallback: (chart) => {
          const horizontalLineLegend = `
            <li>
              <span style="background-color: tomato; width: 10px; height: 10px; display: inline-block;"></span>
              <span style="margin-left: 5px;">Horizontal Line</span>
            </li>
          `;
          return horizontalLineLegend;
        },
      },
    },
  });
}
