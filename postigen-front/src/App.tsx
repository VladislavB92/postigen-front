import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParcelList from './components/Parcels/ParcelList';
import LockerList from './components/Lockers/LockerList';
import CustomerList from "./components/Customers/CustomerList";
import ResponsiveAppBar from "./components/Global/AppBar";
import ParcelDetail from "./components/Parcels/ParcelDetail";
import LockerDetail from "./components/Lockers/LockerDetail";
import CustomerDetail from "./components/Customers/CustomerDetail";

function App() {
    return (
        <div className="App">
            <Router>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/parcels" element={<ParcelList/>}/>
                    <Route path="/parcels/:parcelId" element={<ParcelDetail/>}/>
                    <Route path="/lockers" element={<LockerList/>}/>
                    <Route path="/lockers/:lockerId" element={<LockerDetail/>}/>
                    <Route path="/customers" element={<CustomerList/>}/>
                    <Route path="/customers/:customerId" element={<CustomerDetail/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
