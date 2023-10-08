import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import api from "../../api";
import { useEffect, useState } from "react";

type CustomerListProps = {
    sender: string;
    receiver: string;
    size: string;
    locker: number;
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'email', width: 300 },
    { field: 'phone', headerName: 'phone', width: 200 },
];


function LockerList() {
    const [customerData, setCustomerData] = useState<CustomerListProps | null>(null);

    useEffect(() => {
        api
            .get('/api/customers/')
            .then((response) => {
                setCustomerData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const rows = Array.isArray(customerData)
        ? customerData.map((data) => ({
            id: data.id,
            email: data.email,
            phone: data.phone,
        }))
        : [];

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

export default LockerList;