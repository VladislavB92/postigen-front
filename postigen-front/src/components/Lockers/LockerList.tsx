import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import api from "../../api";
import { useEffect, useState } from "react";

type LockerListProps = {
    sender: string;
    receiver: string;
    size: string;
    locker: number;
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'location_address', headerName: 'Location', width: 400 },
    {
        field: 'size',
        headerName: 'Size',
        type: 'number',
        width: 90,
    },
    {
        field: 'parcels',
        headerName: 'Parcels',
        type: 'number',
        width: 90,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
    },
];


function LockerList() {
    const [lockerData, setLockerData] = useState<LockerListProps | null>(null);

    useEffect(() => {
        api
            .get('/api/lockers/')
            .then((response) => {
                setLockerData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const rows = Array.isArray(lockerData)
        ? lockerData.map((data) => ({
            id: data.id,
            location_address: data.location_address,
            size: data.size,
            parcels: data.parcels[0]?.id,
            status: data.status
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