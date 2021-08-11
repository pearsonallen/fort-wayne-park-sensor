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

        let dataLabels = data.filter(x=>x.DeviceID==="frankesensor-1").map(function(t) { 
          var d = new Date(t.Timestamp);
          return d.toLocaleTimeString();
        });
        let dataValues_1 =  data.map(function(t)  { if (t.DeviceID === 'frankesensor-1')  {return map(t.Value); } else { return undefined} }).filter(x => x !== undefined);
        let dataValues_2 =  data.map(function(t)  { if (t.DeviceID === 'frankesensor-2') { return map(t.Value);} else { return undefined} }).filter(x => x !== undefined);
        const chartConfig = {
          type: 'line',        
          data: {
            labels: dataLabels,
            datasets: [{
            label: 'East Side',
            data: dataValues_1
            },
            {
              label: 'West Side',
              data: dataValues_2
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