import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Customer } from '../../../types/common';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

function CustomerDetail() {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState<Customer | null>(null); // Specify the type

    useEffect(() => {
        api.get<Customer>(`/api/customers/${customerId}/`)
            .then((response) => {
                setCustomer(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching customer ${customerId}:`, error);
            });
    }, [customerId]);

    if (!customer) {
        return <div>Loading...</div>;
    }

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
                Customer ID: {customer.id}
            </Typography>
            <div>
                <h2>Email: {customer.email}</h2>
                <h2>Phone number: {customer.phone}</h2>
            </div>
        </Box>
    );
}

export default CustomerDetail;
