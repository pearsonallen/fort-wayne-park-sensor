import axios from 'axios';
import GaugeChart from './GaugeChart';
import React, { useState, useEffect, useRef } from "react";

function SensorCard(props) {
  const [sensorValue, setSensorValue] = useState(0);
  const [cardColor, setCardColor] = useState("");
  const favicon = useRef(getFaviconEl());
  
  const {greenStop, cautionStop, redStop, sensorID} = props;
  const {updateSideClosed} = props;

  const rStop = map(redStop);
  const cStop = map(cautionStop);
  const gStop = map(greenStop);

  function getFaviconEl() {
    return document.getElementById("favicon");
  }

  function map (val) {
    let r = (val - 366) * (100 - 0) / (599 - 366) + 0;
    return r <= 0 ? 0 : r;
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/GetCurrentSensorValue?sensorid=" + sensorID).then(response => {
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
    });
  }, [rStop, gStop, cStop, greenStop, sensorID, updateSideClosed]);

  const rideabilityDescription = (sensorValue) => {
    if (sensorValue <= rStop) {
      return "Trails are closed";
    } else if (sensorValue <= cStop) {
      return "Ride with caution";
    } else {
      return "Trails are rideable";
    }
  }

  const cardClassName = "item " + cardColor;
  const dotClassName = "dot " + cardColor;
  return (
    <div className={cardClassName}>
    <div className="item-title">
      <p className="cardTitle">{props.siteName} - {sensorValue}% ({rideabilityDescription(sensorValue)})</p>
      <p className={dotClassName}></p>
    </div>
    <div className="clear"></div>
  <p>
    <GaugeChart cStop={cStop} rStop={rStop} value={sensorValue} />
  </p>
  </div>
  )
}

export default SensorCard;