import './App.scss';
import SensorCard from './SensorCard'
import SensorChart from './SensorChart';
import SensorMap from './SensorMap';
import React, { useState } from "react";

function App() {

  const [westSideStatusClass, setWestSideStatusClass] = useState("");
  const [eastSideStatusClass, setEastSideStatusClass] = useState("");
  const [eastSideHoverClass, setEastSideHoverClass] = useState("");
  const [westSideHoverClass, setWestSideHoverClass] = useState("");

  const updateSideClosed = (side) => {
    if (side === "east") {
      setEastSideStatusClass("closed");
    } else if (side === "west") {
      setWestSideStatusClass("closed");
    }
  }

  const setIsHovered = (side) => {
    if (side === "east") {
      setEastSideHoverClass("hovered");
    } else if (side === "west") {
      setWestSideHoverClass("hovered");
    }
    else {
      setEastSideHoverClass("");
      setWestSideHoverClass("");
    }
  }

  return (
    <article className="post">
       <div className={'container warning-message ' + (eastSideStatusClass === "closed" || westSideStatusClass === "closed" ? "closed" : "open")}>
        <h2>Trails are CLOSED</h2>
      </div>
      <div className="status-container">
        <div className=" map-container">
          <SensorMap eastSideStatus={eastSideStatusClass} westSideStatus={westSideStatusClass} eastSideHoverStatus={eastSideHoverClass} westSideHoverStatus={westSideHoverClass} />
        </div>
        <div className="sensor-container">
          <div className="card-container" onMouseEnter={() => setIsHovered("east")} onMouseLeave={() => setIsHovered("")}>
            <SensorCard sensorID="frankesensor-1" siteName="East Side" redStop="380" cautionStop="390" greenStop="395" updateSideClosed={() => updateSideClosed("east")} />
          </div>
          <div className="card-container" onMouseEnter={() => setIsHovered("west")} onMouseLeave={() => setIsHovered("")}>
            <SensorCard sensorID="frankesensor-2" siteName="West Side" redStop="380" cautionStop="390" greenStop="395"  updateSideClosed={() => updateSideClosed("west")}/>
          </div>
        </div>
      </div>
      <SensorChart />
    </article>
  )
}

export default App;
