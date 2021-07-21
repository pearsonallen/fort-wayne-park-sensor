import React, { useEffect, useRef } from "react";
import Chart from 'chart.js/auto'
import axios from 'axios';

function SensorChart() {
  const chartContainer = useRef(null);
  
  function map (val) {
    return (val - 366) * (100 - 0) / (599 - 366) + 0;
  }
  
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
        let dataValues =  data.map(function(t) {return map(t.Value); });

        const chartConfig = {
          type: 'line',        
          data: {
            labels: dataLabels,
            datasets: [{
            label: 'East Side',
            data: dataValues
            }]
          }
        }
        new Chart(chartContainer.current, chartConfig);
      }); 
    }
    
  }, [chartContainer]);

  return (
    <div class="container">
      <canvas ref={chartContainer} />
    </div>
  );
}

export default SensorChart;