import { useState } from 'react';
import { Button } from './Button';
import { Stats } from './Stats';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
        <Button text={'good'} onClick={() => setGood((state) => ++state)} />
        <Button
          text={'neutral'}
          onClick={() => setNeutral((state) => ++state)}
        />
        <Button text={'bad'} onClick={() => setBad((state) => ++state)} />
      </div>
      {good || neutral || bad ? (
        <Stats good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

export default App;
