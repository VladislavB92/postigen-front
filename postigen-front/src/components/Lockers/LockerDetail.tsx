import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Locker } from '../../../types/common';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { LinearIndeterminate } from "../Global/LoadingBar";

function LockerDetail() {
    const { lockerId } = useParams();
    const [locker, setLocker] = useState<Locker | null>(null); // Specify the type

    useEffect(() => {
        api.get<Locker>(`/api/lockers/${lockerId}/`)
            .then((response) => {
                setLocker(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching locker ${lockerId}:`, error);
            });
    }, [lockerId]);

    if (!locker) {
        return <LinearIndeterminate/>;
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
                Locker ID: {locker.id}
            </Typography>
            <div>
                <h2>Address: {locker.location_address}</h2>
                <h2>Size: {locker.size}</h2>
                <h2>Status: {locker.status}</h2>
            </div>
        </Box>
    );
}

export default LockerDetail;
