import axios from 'axios';
import Gauge from 'chartjs-gauge'
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

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
    axios.get(process.env.REACT_APP_API + "/GetCurrentSensorValue?sensorid=" + sensorID).then(response => {
      let rStop = map(redStop);
      let cStop = map(cautionStop);
      let gStop = map(greenStop);

      let val = response.data;
      val = map(val);
      setSensorValue(Math.round(val));
      getFaviconEl();
      let cardColor = "";
      if (val >= gStop) {
        cardColor = "good";
        favicon.current.href = window.location.href + "favicon-green.ico";
      } else if (val >= rStop) {
        cardColor = "caution";  
        favicon.current.href = window.location.href + "favicon-yellow.ico";
      } else {
        cardColor = "danger";
        favicon.current.href = window.location.href + "favicon-red.ico";
        updateSideClosed();
      }
      setCardColor(cardColor);
      
      const chartConfig = {
        type: 'gauge',
        data: {
          datasets: [{
            value: val,
            minValue: 0,
            data: [rStop, cStop, 100],
            backgroundColor: ['red', 'orange', 'green'],
          }]
        },
        options: {
          needle: {
            radiusPercentage: 2,
            widthPercentage: 3.2,
            lengthPercentage: 80,
            color: 'rgba(0, 0, 0, 1)'
          },
          valueLabel: {
            display: true,
            formatter: (value) => {
              return Math.round(value) + '%';
            },
            color: 'rgba(255, 255, 255, 1)',
            backgroundColor: 'rgba(0, 0, 0, 1)',
            borderRadius: 5,
            padding: {
              top: 10,
              bottom: 10
            }
          }
        }
      }
      
      new Gauge(chartContainer.current, chartConfig);
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