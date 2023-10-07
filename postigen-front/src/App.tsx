import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParcelList from './components/Parcels/ParcelList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ParcelList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
