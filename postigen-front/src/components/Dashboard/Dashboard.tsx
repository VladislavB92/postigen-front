import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <Box p={3} display="flex" justifyContent="space-evenly">
            <Card sx={{ minWidth: 500, maxWidth: 800, minBlockSize: 600 }}>
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
                                }}
                    >
                        Total lockers
                    </Typography>
                    <Typography variant="h5" component="div">
                    </Typography>
                    <Typography variant="h4"
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
                        Total parcels
                    </Typography>
                    <Typography variant="h4"
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
                        Total customers
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} to='parcels'>Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    );
}