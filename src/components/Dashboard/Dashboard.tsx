import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { fetchLockers, fetchParcels, fetchCustomers } from '../../apiService';

export default function Dashboard() {
    const [totalLockers, setTotalLockers] = useState(0);
    const [totalParcels, setTotalParcels] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);

    useEffect(() => {
        fetchLockers()
            .then((response) => {
                setTotalLockers(response.data.length);
            })
        fetchParcels()
            .then((response) => {
                setTotalParcels(response.data.length);
            })
        fetchCustomers()
            .then((response) => {
                setTotalCustomers(response.data.length);
            })
    }, []);

    return (
        <Box p={3} display="flex" justifyContent="space-evenly" alignItems="center">
            <Card sx={{ minWidth: 500, maxWidth: 800, minBlockSize: 300 }}>
                <CardContent>
                    <Typography variant="h4"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                        Total parcels: {totalParcels}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        component={Link}
                        to="lockers"
                    >
                        Learn More
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ minWidth: 500, maxWidth: 800, minBlockSize: 300 }}>
                <CardContent>
                    <Typography variant="h4"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                        Total lockers: {totalLockers}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        component={Link}
                        to="parcels"
                    >
                        Learn More
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ minWidth: 500, maxWidth: 800, minBlockSize: 300 }}>
                <CardContent>
                    <Typography variant="h4"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                        Total customers: {totalCustomers}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        component={Link}
                        to="customers"
                    >
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
