import axios from 'axios';
import Chart from 'chart.js/auto'
import React, { useState, useEffect, useRef } from "react";

function SensorValue(props) {
  const [sensorValue, setSensorValue] = useState(0);
  const chartContainer = useRef(null);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
    axios.get(process.env.REACT_APP_API + "/GetCurrentSensorValue?sensorid=" + props.sensorID).then(response => {
      setSensorValue(response.data);

      const chartConfig = {
        type: 'bar',
        options: {indexAxis: 'y',
        scales: {
          x: {
            min: 360,
            max: 450,
          }
        }},        
        data: {
          labels: [""],
          datasets: [{
            label: '',
            data: [response.data]
          }]
        }
      }
      new Chart(chartContainer.current, chartConfig);
    });
  }
  }, [chartContainer, props]);

  return (<p>
    The soil dryness in this area is {sensorValue}
    <canvas ref={chartContainer} />
  </p>)
}

export default SensorValue;