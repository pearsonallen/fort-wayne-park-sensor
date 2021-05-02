import './App.css';

function App() {
  var sensorValue = 780;
  var trailCondition = 'Very Muddy';
  return (
    <div className="App">
      <h1>Fort Wayne Franke Park Trail Condition</h1>
      <h2>How muddy is the trail?</h2>
      <h4>{trailCondition}</h4>
      <h5>{sensorValue} / 1024</h5>
    </div>
  );
}

export default App;
