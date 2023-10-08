import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParcelList from './components/Parcels/ParcelList';
import LockerList from './components/Lockers/LockerList';
import CustomerList from "./components/Customers/CustomerList";
import ResponsiveAppBar from "./components/Global/AppBar";
import ParcelDetails from "./components/Parcels/ParcelDetails";
import LockerDetails from "./components/Lockers/LockerDetails";
import CustomerDetails from "./components/Customers/CustomerDetails";

function App() {
    return (
        <div className="App">
            <Router>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/parcels" element={<ParcelList/>}/>
                    <Route path="/parcels/:parcelId" element={<ParcelDetails/>}/>
                    <Route path="/lockers" element={<LockerList/>}/>
                    <Route path="/lockers/:lockerId" element={<LockerDetails/>}/>
                    <Route path="/customers" element={<CustomerList/>}/>
                    <Route path="/customers/:customerId" element={<CustomerDetails/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
