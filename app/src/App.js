import './App.scss';
import SensorValue from './SensorValue'
import SensorChart from './SensorChart';
import SensorMap from './SensorMap';
import React, { useState } from "react";

function App(props) {

  const [westSideStatusClass, setWestSideStatusClass] = useState("");
  const [eastSideStatusClass, setEastSideStatusClass] = useState("");


  return (
    <article className="post">
      {/* Also Need value from SensorValue to state if the trails are open or not & Classes updated */}
      <div className="container warning-message closed/open">
        <h2>Trails are CLOSED/OPEN</h2>
      </div>
      <div className="status-container">
        <div className=" map-container">
          <SensorMap />
        </div>
        <div className="sensor-container">
          <div className="card-container">
            <SensorValue sensorID="frankesensor-1" siteName="East Side" redStop="380" cautionStop="390" greenStop="395" />
          </div>
          <div className="card-container">
            <SensorValue sensorID="frankesensor-2" siteName="West Side" redStop="380" cautionStop="390" greenStop="395" />
          </div>
          {console.log(westSideStatusClass)}
        </div>
      </div>
{/*   TODO: Need to pass values from SensorValue to App so they can be used to trigger a "closed" class in this component*/} 
      <SensorChart westSideStatus={westSideStatusClass} eastSideStatus={eastSideStatusClass} />
    </article>
  )
}

export default App;
