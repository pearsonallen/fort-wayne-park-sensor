import axios from 'axios';
import React, { useState, useEffect } from "react";
import Chart from 'chart.js/auto'

function SensorChart() {
  const [sensorValue, setSensorValue] = useState(0);

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  
  function months(config) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;
  
    for (i = 0; i < count; ++i) {
      value = MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }
  
    return values;
  }

  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');
    const labels = months({count: 7});
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
});
  }, []);

  return <div className="container">
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
}

export default SensorChart;