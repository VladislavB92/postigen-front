import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Locker, Parcel } from '../../../types/common';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { LinearIndeterminate } from "../Global/LoadingBar";
import BackButton from "../Global/Buttons/BackButton";
import Button from '@mui/material/Button';
import { Alert, Grid } from "@mui/material";
import { fetchLocker, takeParcel } from "../../apiService";

function LockerDetails(): React.ReactElement {
    const { lockerId } = useParams();
    const [locker, setLocker] = useState<Locker | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [parcels, setParcels] = useState<Parcel[]>([]);

    useEffect(() => {
        fetchLocker(lockerId)
            .then((response) => {
                setLocker(response.data);
                setParcels(response.data.parcels || []);
                setSuccessMessage(null);
                setErrorMessage(null);
            })
    }, [lockerId]);

    const handleTakeParcel = async (lockerId: number, parcelId: number) => {
        try {
            const response = await takeParcel(lockerId, parcelId)
            if (response.status === 200) {
                setSuccessMessage('Parcel taken successfully');
                setParcels((prevParcels) => prevParcels.filter((parcel) => parcel.id !== parcelId));
            } else {
                setErrorMessage('Operation was not successful');
            }
        } catch (error) {
            console.error('Error taking out parcel:', error);
            setErrorMessage('Operation was not successful');
        }
    };

    if (!locker) {
        return <LinearIndeterminate/>;
    }

    return (
        <Box p={3}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <BackButton to="/lockers" label="Back to Lockers"/>
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
                        Locker ID: {locker.id}
                    </Typography>
                </Grid>
            </Grid>
            <div>
                <h2>Address: {locker.location_address}</h2>
                <h2>Size: {locker.size}</h2>
                <h2>Status: {locker.status}</h2>
                {parcels.length > 0 ? (
                    <div>
                        <h2>Parcels:</h2>
                        {parcels.map((parcel: Parcel) => (
                            <div key={parcel.id}>
                                <p>Parcel ID: {parcel.id}</p>
                                <p>Sender Email: {parcel.sender[0].email}</p>
                                <p>Sender Phone: {parcel.sender[0].phone}</p>
                                <p>Receiver Email: {parcel.receiver[0].email}</p>
                                <p>Receiver Phone: {parcel.receiver[0].phone}</p>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleTakeParcel(locker.id, parcel.id)}
                                >
                                    Take out the parcel
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : null}
                {successMessage && <p><Alert severity="success">{successMessage}</Alert></p>}
                {errorMessage && <p><Alert severity="error">{errorMessage}</Alert></p>}
            </div>
        </Box>
    );
}

export default LockerDetails;
