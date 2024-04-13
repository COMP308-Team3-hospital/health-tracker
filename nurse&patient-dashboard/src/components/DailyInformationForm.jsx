// DailyInformationForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function DailyInformationForm() {
  const [pulseRate, setPulseRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [weight, setWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Daily Information:', { pulseRate, bloodPressure, weight, temperature, respiratoryRate });
  };

  return (
    <div>
      <h2>Daily Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pulse Rate:
          <input type="text" value={pulseRate} onChange={(e) => setPulseRate(e.target.value)} />
        </label>
        <br />
        <label>
          Blood Pressure:
          <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />
        </label>
        <br />
        <label>
          Weight:
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <br />
        <label>
          Temperature:
          <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
        </label>
        <br />
        <label>
          Respiratory Rate:
          <input type="text" value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit Daily Information</button>
        <br />
        <Link to="/symptoms">Go to Symptoms Checklist</Link>
      </form>
    </div>
  );
}

export default DailyInformationForm;
