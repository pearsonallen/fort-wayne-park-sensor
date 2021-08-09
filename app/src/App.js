import './App.scss';
import SensorValue from './SensorValue'
import SensorChart from './SensorChart';
import SensorMap from './SensorMap';

function App() {

  return (
    <article class="post">
      <div class="container">
        <h2> </h2>
      </div>
      <div class="status-container">
        <div class=" map-container">
          <SensorMap />
        </div>
        <div class="sensor-container">
          <div class="card-container">
            <SensorValue sensorID="frankesensor-1" redStop="380" cautionStop="390" greenStop="395" />
          </div>
          <div class="card-container">
            <SensorValue sensorID="frankesensor-2" redStop="380" cautionStop="390" greenStop="395" />
            
          </div>
        </div>
      </div>

        <SensorChart />
    </article>
  );
}

export default App;
