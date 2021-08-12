import './App.scss';
import SensorValue from './SensorValue'
import SensorChart from './SensorChart';
import SensorMap from './SensorMap';
import React, { useState } from "react";

function App() {

  const [westSideStatusClass, setWestSideStatusClass] = useState("");
  const [eastSideStatusClass, setEastSideStatusClass] = useState("");

  const updateSideClosed = (side) => {
    if (side === "east") {
      setEastSideStatusClass("closed");
    } else if (side === "west") {
      setWestSideStatusClass("closed");
    }
  }

  return (
    <article className="post">
       <div className={'container warning-message ' + (eastSideStatusClass === "closed" || westSideStatusClass === "closed" ? "closed" : "open")}>
        <h2>Trails are CLOSED</h2>
      </div>
      <div className="status-container">
        <div className=" map-container">
          <SensorMap eastSideStatus={eastSideStatusClass} westSideStatus={westSideStatusClass} />
        </div>
        <div className="sensor-container">
          <div className="card-container">
            <SensorValue sensorID="frankesensor-1" siteName="East Side" redStop="380" cautionStop="390" greenStop="395" updateSideClosed={() => updateSideClosed("east")} />
          </div>
          <div className="card-container">
            <SensorValue sensorID="frankesensor-2" siteName="West Side" redStop="380" cautionStop="390" greenStop="395"  updateSideClosed={() => updateSideClosed("west")} />
          </div>
        </div>
      </div>
      <SensorChart />
    </article>
  )
}

export default App;
