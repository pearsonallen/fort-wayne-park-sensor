import axios from 'axios';
import Chart from 'chart.js/auto'
import React, { useState, useEffect, useRef } from "react";

function SensorValue(props) {
  const [sensorValue, setSensorValue] = useState(0);
  const chartContainer = useRef(null);
  const [cardColor, setCardColor] = useState("");

  function map (val) {
    return (val - 366) * (100 - 0) / (599 - 366) + 0;
  }

  function showAmount(val,checkVal, prevVal, last) {
    if (val > checkVal && prevVal == null) {
      return checkVal;
    }
    if (last === true) {
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
      let redStop = props.redStop; let cautionStop = props.cautionStop; let greenStop = props.greenStop;

      redStop = map(redStop);
      cautionStop = map(cautionStop);
      greenStop = map(greenStop);

      let val = response.data;
      val = map(val);
      setSensorValue(Math.round(val));
      let cardColor = "";
      if (val >= greenStop) {
        cardColor = "good";
      } else if (val >= cautionStop) {
        cardColor = "caution";        
      } else {
        cardColor = "warning";
      }
      setCardColor(cardColor);
      let redAmount = showAmount(val,redStop);
      let cautionAmount = showAmount(val, cautionStop, redStop);
      let greenAmount = showAmount(val,greenStop,cautionStop, true);

      const chartConfig = {
        type: 'bar',
        options: {indexAxis: 'y',
        scales: {
          x: {
            min: 0,
            max: 100,
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

  const cardClassName = "item " + cardColor;
  const dotClassName = "dot " + cardColor;
  return (
    <div className={cardClassName}>
    <div class="item-title">
      <p class="cardTitle">East Side</p>
      <p className={dotClassName}></p>
    </div>
    <div class="clear"></div>
  <p>
    The soil dryness in this area is {sensorValue}%
    <canvas ref={chartContainer} />
  </p>
  </div>
  )
}

export default SensorValue;