// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DailyInformationForm from './components/DailyInformationForm';
import SymptomsChecklist from './components/SymptomsChecklist';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={DailyInformationForm} />
        <Route path="/symptoms" component={SymptomsChecklist} />
      </Switch>
    </Router>
  );
}

export default App;

