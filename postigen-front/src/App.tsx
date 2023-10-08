import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParcelList from './components/Parcels/ParcelList';
import LockerList from './components/Lockers/LockerList';
import CustomerList from "./components/Customers/CustomerList";
import ResponsiveAppBar from "./components/Global/AppBar";

function App() {
    return (
        <div className="App">
            <Router>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/parcels" element={<ParcelList/>}/>
                    <Route path="/lockers" element={<LockerList/>}/>
                    <Route path="/customers" element={<CustomerList/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
