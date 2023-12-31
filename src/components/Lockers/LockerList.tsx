import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Locker } from "../../../types/common";
import Typography from "@mui/material/Typography";
import { fetchLockers } from "../../apiService";
import "../Global/Fonts/Fonts.css";


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

function LockerList(): React.ReactElement {
   const [lockerData, setLockerData] = useState<Locker[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLockers()
            .then((response) => {
                setLockerData(response.data);
            })
    }, []);

    const handleRowClick = (params: any) => {
        const lockerId = params.row.id;
        navigate(`/lockers/${lockerId}`);
    };

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
                Lockers
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

export default LockerList;
