import './App.scss';
import SensorValue from './SensorValue'
import SensorChart from './SensorChart';

function App() {
  return (
    <article class="post">
      <div class="container">
        <h2></h2>
      </div>
      <div class="container columns thirds">
      <div class="item">
        <div class="item-title">
          East Side
        </div>

        <SensorValue sensorID="frankesensor-1" />
      </div>
      </div>
        <SensorChart />
    </article>
  );
}

export default App;
