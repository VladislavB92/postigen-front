import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Customer } from '../../../types/common';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { LinearIndeterminate } from "../Global/LoadingBar";
import BackButton from "../Global/Buttons/BackButton";
import { Grid } from '@mui/material';

function CustomerDetails(): React.ReactElement {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState<Customer | null>(null);

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
        return <LinearIndeterminate/>;
    }

    return (
        <Box p={3}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <BackButton to="/customers" label="Back to Customers"/>
                </Grid>
                <Grid item>
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
                </Grid>
            </Grid>
            <div>
                <h2>Email: {customer.email}</h2>
                <h2>Phone number: {customer.phone}</h2>
            </div>
        </Box>
    );
}

export default CustomerDetails;
