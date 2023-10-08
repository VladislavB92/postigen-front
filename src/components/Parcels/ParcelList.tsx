import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Parcel } from "../../../types/common";
import Typography from "@mui/material/Typography";
import { fetchParcels } from "../../apiService";
import "../Global/Fonts/Fonts.css";


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


function ParcelList(): React.ReactElement {
    const [parcelData, setParcelData] = useState<Parcel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchParcels()
            .then((response) => {
                setParcelData(response.data);
            })
    }, []);

    const handleRowClick = (params: any) => {
        const parcelId = params.row.id;
        navigate(`/parcels/${parcelId}`);
    };


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
            <Typography
                variant="h4"
                noWrap
                className="font-colour"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Parcels
            </Typography>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onRowClick={handleRowClick}
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