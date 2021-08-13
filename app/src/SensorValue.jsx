import axios from 'axios';
import Chart from 'chart.js/auto'
import React, { useState, useEffect, useRef } from "react";

function SensorValue(props) {

  const [sensorValue, setSensorValue] = useState(0);
  const chartContainer = useRef(null);
  const [cardColor, setCardColor] = useState("");
  const favicon = useRef(getFaviconEl());
  const {greenStop, cautionStop, redStop, sensorID} = props;
  const {updateSideClosed} = props;
  function getFaviconEl() {
    return document.getElementById("favicon");
  }

  function map (val) {
    let r = (val - 366) * (100 - 0) / (599 - 366) + 0;
    return r <= 0 ? 0 : r;
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
    if (val < checkVal) {
      return val;
    }
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
    axios.get(process.env.REACT_APP_API + "/GetCurrentSensorValue?sensorid=" + sensorID).then(response => {
      //let redStop = props.redStop; let cautionStop = props.cautionStop; let greenStop = props.greenStop;
      let rStop = map(redStop);
      let cStop = map(cautionStop);
      let gStop = map(greenStop);

      let val = response.data;
      val = map(val);
      setSensorValue(Math.round(val));
      getFaviconEl();
      let cardColor = "";
      if (val >= greenStop) {
        cardColor = "good";
        favicon.current.href = window.location.href + "favicon-green.ico";
      } else if (val >= cautionStop) {
        cardColor = "caution";  
        favicon.current.href = window.location.href + "favicon-yellow.ico";
      } else {
        cardColor = "danger";
        favicon.current.href = window.location.href + "favicon-red.ico";
        updateSideClosed();
      }
      setCardColor(cardColor);
      let redAmount = showAmount(val,rStop);
      let cautionAmount = showAmount(val, cStop, rStop);
      let greenAmount = showAmount(val,gStop,cStop, true);
      

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
  // eslint-disable-next-line
  }, [chartContainer, redStop, cautionStop, greenStop, sensorID]);

  const cardClassName = "item " + cardColor;
  const dotClassName = "dot " + cardColor;
  return (
    <div className={cardClassName}>
    <div className="item-title">
      <p className="cardTitle">{props.siteName}</p>
      <p className={dotClassName}></p>
    </div>
    <div className="clear"></div>
  <p>
    The soil dryness in this area is {sensorValue}%
    <canvas ref={chartContainer} />
  </p>
  </div>
  )
}

export default SensorValue;