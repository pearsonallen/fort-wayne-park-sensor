import axios from 'axios';
import React, { useState, useEffect } from "react";

function SensorValue() {
  const [sensorValue, setSensorValue]

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/GetCurrentSensorValue?sensorid=moisturesensor1").then(response => {
      setSensorValue(response.data);
    })
  }, []);

  return <div className="sensorValue">
    The ground moisture is at {sensorValue}%
  </div>
}

export default SensorValue;