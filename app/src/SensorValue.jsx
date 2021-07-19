import axios from 'axios';
import React, { useState, useEffect } from "react";

function SensorValue() {
  const [sensorValue, setSensorValue] = useState(0);



  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/GetCurrentSensorValue?sensorid=frankesensor-1").then(response => {
      setSensorValue(response.data);
    })
  }, []);

  return <div className="sensorValue">
    The ground dryness is {sensorValue} (300 - 500 wet to dry)
  </div>
}

export default SensorValue;