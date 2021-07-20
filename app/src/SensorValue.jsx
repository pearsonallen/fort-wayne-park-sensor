import axios from 'axios';
import React, { useState, useEffect } from "react";

function SensorValue(props) {
  const [sensorValue, setSensorValue] = useState(0);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/GetCurrentSensorValue?sensorid=" + props.sensorID).then(response => {
      setSensorValue(response.data);
    })
  }, []);

  return <p>
    The wettest soil is {sensorValue} )
  </p>
}

export default SensorValue;