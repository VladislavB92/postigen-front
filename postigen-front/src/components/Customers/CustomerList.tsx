import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import api from "../../api";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Customer } from "../../../types/common";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'phone', headerName: 'Phone', width: 200 },
];


function LockerList(): React.ReactElement {
    const [customerData, setCustomerData] = useState<Customer | null>(null);
    const navigate = useNavigate();

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

    const handleRowClick = (params: any) => {
        const customerId = params.row.id;
        navigate(`/customers/${customerId}`);
    };


    const rows = Array.isArray(customerData)
        ? customerData.map((data) => ({
            id: data.id,
            email: data.email,
            phone: data.phone,
        }))
        : [];

    return (
        <Box p={3}>
            <Typography
                variant="h4"
                noWrap
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
                Customers
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