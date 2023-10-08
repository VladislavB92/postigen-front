import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParcelList from './components/Parcels/ParcelList';
import LockerList from './components/Lockers/LockerList';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<ParcelList/>}/>
                    <Route path="/lockers" element={<LockerList/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
