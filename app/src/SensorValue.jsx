import axios from 'axios';
import Chart from 'chart.js/auto'
import React, { useState, useEffect, useRef } from "react";

function SensorValue(props) {
  const [sensorValue, setSensorValue] = useState(0);
  const chartContainer = useRef(null);

  function showAmount(val,checkVal, prevVal, last) {
    if (val > checkVal && prevVal == null) {
      return checkVal;
    }
    if (last == true) {
      let c = Math.min(val - prevVal,checkVal - prevVal);
      return Math.max(c,val - prevVal);
    }
    if (prevVal != null) {      
      return Math.min(val - prevVal,checkVal - prevVal);      
    }
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
    axios.get(process.env.REACT_APP_API + "/GetCurrentSensorValue?sensorid=" + props.sensorID).then(response => {
      setSensorValue(response.data);
      let val = response.data;

      let redStop = props.redStop; let cautionStop = props.cautionStop; let greenStop = props.greenStop;
      let redAmount = showAmount(val,redStop);
      let cautionAmount = showAmount(val, cautionStop, redStop);
      let greenAmount = showAmount(val,greenStop,cautionStop, true);

      const chartConfig = {
        type: 'bar',
        options: {indexAxis: 'y',
        scales: {
          x: {
            min: 360,
            max: 450,
            stacked: true
          }
        },
        plugins: {
          legend: {
              display: false
          }
      }
      },        
        data: {
          labels: [""],
          datasets: [
          {
            label: '',
            data: [redAmount],
            backgroundColor: '#ff1000',
            stack: 'Stack 0'
          },
          {
            label: '',
            data: [cautionAmount],
            backgroundColor: '#ff8000',
            stack: 'Stack 0'
          },
          {
            label: '',
            data: [greenAmount],
            backgroundColor: '#50C878',
            stack: 'Stack 0'
          },
        ]
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