// SymptomsChecklist.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SymptomsChecklist() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const commonSymptoms = [
    { id: 1, name: 'Fever' },
    { id: 2, name: 'Cough' },
    { id: 3, name: 'Shortness of breath' },
    { id: 4, name: 'Fatigue' },
    { id: 5, name: 'Muscle or body aches' },
    { id: 6, name: 'Headache' },
    { id: 7, name: 'Sore throat' },
    { id: 8, name: 'Loss of taste or smell' },
    { id: 9, name: 'Nasal congestion' },
    { id: 10, name: 'Runny nose' },
    { id: 11, name: 'Nausea or vomiting' },
    { id: 12, name: 'Diarrhea' },
    // Add more symptoms as needed
  ];

  const handleSymptomChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the selected symptoms to your backend or process it further
    console.log('Selected Symptoms:', selectedSymptoms);
    // You may also want to reset the symptoms list here
  };

  return (
    <div>
      <h2>Symptoms Checklist</h2>
      <form onSubmit={handleSubmit}>
        {commonSymptoms.map(symptom => (
          <div key={symptom.id}>
            <label>
              <input type="checkbox" value={symptom.name} onChange={handleSymptomChange} />
              {symptom.name}
            </label>
          </div>
        ))}
        <button type="submit">Submit Symptoms</button>
      </form>
      <br />
      <Link to="/">Go to Daily Information</Link>
    </div>
  );
}

export default SymptomsChecklist;
