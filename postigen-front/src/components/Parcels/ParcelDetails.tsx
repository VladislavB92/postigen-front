import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Parcel, Locker } from "../../../types/common";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { LinearIndeterminate } from "../Global/LoadingBar";
import BackButton from "../Global/Buttons/BackButton";
import Button from '@mui/material/Button';
import { Alert, Select, MenuItem } from "@mui/material";
import { Grid } from '@mui/material';

function ParcelDetails(): React.ReactElement {
    const { parcelId } = useParams();
    const [parcel, setParcel] = useState<Parcel | null>(null);
    const [lockers, setLockers] = useState<Locker[]>([]);
  const [selectedLocker, setSelectedLocker] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        api.get<Parcel>(`/api/parcels/${parcelId}/`)
            .then((response) => {
                setParcel(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching parcel ${parcelId}:`, error);
            });

        api.get<Locker[]>('/api/lockers/')
            .then((response) => {
                setLockers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching lockers:', error);
            });
    }, [parcelId]);

    const handlePutParcelIntoLocker = async () => {
        if (selectedLocker !== null) {
            try {
                const response = await api.put(
                    `/api/parcels/${parcelId}/put-parcel/`,
                {"locker_id": selectedLocker},
                );
                if (response.status === 200) {
                    setSuccessMessage('Parcel put into locker successfully');
                    setParcel((prevParcel) => ({
                        ...(prevParcel as Parcel),
                        locker: selectedLocker,
                    }));
                } else {
                    setErrorMessage('Operation was not successful');
                }
            } catch (error) {
                console.error('Error putting parcel into locker:', error);
                setErrorMessage('Operation was not successful');
            }
        } else {
            setErrorMessage('Please select a locker');
        }
    };

    if (!parcel) {
        return <LinearIndeterminate/>;
    }

    return (
        <Box p={3}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <BackButton to="/parcels" label="Back to Parcels"/>
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
                        Parcel ID: {parcel.id}
                    </Typography>
                </Grid>
            </Grid>
            <div>
                <h2>Sender:</h2>
                <p>Email: {parcel.sender[0].email}</p>
                <p>Phone: {parcel.sender[0].phone}</p>
                <h2>Receiver:</h2>
                <p>Email: {parcel.receiver[0].email}</p>
                <p>Phone: {parcel.receiver[0].phone}</p>
                <h2>Size: {parcel.size}</h2>
                {parcel.locker ? (
                    <div>
                        <h2>Locker ID: {parcel.locker}</h2>
                    </div>
                ) : (
                    <div>
                        <Select
                            value={selectedLocker}
                            onChange={(e) => setSelectedLocker(e.target.value as number)}
                            placeholder="Select a locker"
                        >
                            {lockers.map((locker) => (
                                <MenuItem key={locker.id} value={locker.id}>
                                    {locker.location_address} - {locker.size} - {locker.status}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePutParcelIntoLocker}
                        >
                            Put parcel into a locker
                        </Button>
                    </div>
                )}
                {successMessage && <p><Alert severity="success">{successMessage}</Alert></p>}
                {errorMessage && <p><Alert severity="error">{errorMessage}</Alert></p>}
            </div>
        </Box>
    );
}

export default ParcelDetails;
