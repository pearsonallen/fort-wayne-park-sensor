import './App.css';
import SensorValue from './SensorValue'
import SensorChart from './SensorChart';

function App() {
  return (
    <section className="App">
      <h1>Fort Wayne Franke Park Trail Condition</h1>
      <h2>How muddy is the trail?</h2>
        <SensorValue />
        <SensorChart />
    </section>
  );
}

export default App;
