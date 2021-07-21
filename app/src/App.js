import './App.scss';
import SensorValue from './SensorValue'
import SensorChart from './SensorChart';

function App() {

  return (
    <article class="post">
      <div class="container">
        <h2> </h2>
      </div>
      <div class="container columns thirds">
        <SensorValue sensorID="frankesensor-1" redStop="380" cautionStop="390" greenStop="395" />
      </div>
        <SensorChart />
    </article>
  );
}

export default App;
