import React, { useEffect, useState, useRef } from "react";
import Chart from 'chart.js/auto'
import axios from 'axios';

// function SensorChart() {
//   const chartContainer = useRef(null);
//   const [chartInstance, setChartInstance] = useState(null);

//   useEffect(() => {
//     if(chartContainer && chartContainer.current) {
//       const newChartInstance = new Chart(chartContainer.current, chartConfig);
//       setChartInstance(newChartInstance);
//       axios.get(process.env.REACT_APP_API + "/GetHistoricalSensorValues").then(response => {
//         updateChart(response.data);
//       });
//     }
    
//   }, [chartContainer]);

//   function updateChart(data)
//   {
//     var ctx = document.getElementById('myChart').getContext('2d');

//     var d = data.map(function(item) {return item.Value;});

//     var myChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//           labels: null,
//           datasets: [{
//             label: 'My First Dataset',
//             data: d,
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//           }]
//         }
//   });

//   return ( <div className="container">
//     <canvas ref={chartContainer} width="400" height="400" />
//   </div>
//   );
// }
// }

function SensorChart() {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      

      axios.get(process.env.REACT_APP_API + "/GetHistoricalSensorValues").then(response => {
        var data = response.data;
        data.sort(function(x, y) {
          return Date.parse(x.Timestamp) - Date.parse(y.Timestamp);
        });

        let dataLabels = data.map(function(t) { 
          var d = new Date(t.Timestamp);
          return d.toLocaleTimeString();
        });
        let dataValues =  data.map(function(t) {return t.Value });

        const chartConfig = {
          type: 'line',        
          data: {
            labels: dataLabels,
            datasets: [{
            label: 'Franke Sensor 1',
            data: dataValues
            }]
          }
        }
        const newChartInstance = new Chart(chartContainer.current, chartConfig);
        setChartInstance(newChartInstance);
      }); 
    }
    
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default SensorChart;