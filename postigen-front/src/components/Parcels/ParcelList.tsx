import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import api from "../../api";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';

type ParcelListProps = {
    sender: string;
    receiver: string;
    size: string;
    locker: number;
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'sender', headerName: 'Sender', width: 220 },
    { field: 'receiver', headerName: 'Receiver', width: 220 },
    {
        field: 'size',
        headerName: 'Size',
        type: 'number',
        width: 90,
    },
    {
        field: 'locker',
        headerName: 'Locker',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
    },
];


function ParcelList() {
    const [parcelData, setParcelData] = useState<ParcelListProps | null>(null);

    useEffect(() => {
        api
            .get('/api/parcels/')
            .then((response) => {
                setParcelData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const rows = Array.isArray(parcelData)
        ? parcelData.map((data) => ({
            id: data.id,
            sender: data.sender[0].email,
            receiver: data.receiver[0].email,
            size: data.size,
            locker: data.locker || 'not assigned yet'
        }))
        : [];

    return (
        <Box p={3}>
            <div style={{ height: 600, width: '100%' }}>
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
        </Box>
    );
}

export default ParcelList;