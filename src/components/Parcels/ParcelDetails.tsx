import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Parcel, Locker } from "../../../types/common";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { LinearIndeterminate } from "../Global/LoadingBar";
import BackButton from "../Global/Buttons/BackButton";
import Button from '@mui/material/Button';
import { Alert, Select, MenuItem } from "@mui/material";
import { Grid } from '@mui/material';
import {
    fetchLockers,
    fetchParcel,
    moveParcel,
    putParcel,
} from "../../apiService";
import "../Global/Fonts/Fonts.css";

function ParcelDetails(): React.ReactElement {
    const { parcelId } = useParams();
    const [parcel, setParcel] = useState<Parcel | null>(null);
    const [lockers, setLockers] = useState<Locker[]>([]);
    const [selectedLocker, setSelectedLocker] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showMoveParcel, setShowMoveParcel] = useState(false);
    const [moveToLocker, setMoveToLocker] = useState<string>('');

    useEffect(() => {
        fetchParcel(parcelId)
            .then((response) => {
                setParcel(response.data);
                if (response.data.locker) {
                    setShowMoveParcel(true);
                }
            })

        fetchLockers()
            .then((response) => {
                setLockers(response.data);
            })
    }, [parcelId]);

    const handlePutParcelIntoLocker = async () => {
        if (selectedLocker !== '') {
            try {
                const response = await putParcel(
                    parcelId,
                    parseInt(selectedLocker, 10),
                )
                if (response.status === 200) {
                    setSuccessMessage('Parcel put into locker successfully');
                    setParcel((prevParcel) => ({
                        ...(prevParcel as Parcel),
                        locker: parseInt(selectedLocker, 10),
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

    const handleMoveParcel = async () => {
        if (moveToLocker !== '') {
            try {
                const response = await moveParcel(
                    parcelId,
                    parseInt(moveToLocker, 10),
                );
                if (response.status === 200) {
                    setSuccessMessage('Parcel moved successfully');
                    setParcel((prevParcel) => ({
                        ...(prevParcel as Parcel),
                        locker: parseInt(moveToLocker, 10),
                    }));
                } else {
                    setErrorMessage('Operation was not successful');
                }
            } catch (error) {
                console.error('Error moving parcel:', error);
                setErrorMessage('Operation was not successful');
            }
        } else {
            setErrorMessage('Please select a locker to move the parcel');
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
                        Parcel ID: {parcel.id}
                    </Typography>
                </Grid>
            </Grid>
            <div>
                <div>
                    <h2>Sender:</h2>
                    <p>Email: {parcel.sender[0].email}</p>
                    <p>Phone: {parcel.sender[0].phone}</p>
                </div>
                <div>
                    <h2>Receiver:</h2>
                    <p>Email: {parcel.receiver[0].email}</p>
                    <p>Phone: {parcel.receiver[0].phone}</p>
                </div>
                <div>
                    <h2>Size: {parcel.size}</h2>
                    {parcel.locker ? (
                        <div>
                            <h2>Locker ID: {parcel.locker}</h2>
                            {showMoveParcel && (
                                <div>
                                    <Select
                                        value={moveToLocker}
                                        onChange={(e) => setMoveToLocker(e.target.value as string)}
                                        displayEmpty
                                        sx={{ width: '650px' }}
                                    >
                                        <MenuItem value="" disabled>
                                            Select a locker
                                        </MenuItem>
                                        {lockers
                                            .filter((locker) => locker.status === "free")
                                            .map((locker) => (
                                                <MenuItem key={locker.id} value={locker.id.toString()}>
                                                    {locker.location_address} - {locker.size} - {locker.status}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleMoveParcel}
                                    >
                                        Move parcel
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <Select
                                value={selectedLocker}
                                onChange={(e) => setSelectedLocker(e.target.value as string)}
                                displayEmpty
                                sx={{ width: '650px' }}
                            >
                                <MenuItem value="" disabled>
                                    Select a locker
                                </MenuItem>
                                {lockers
                                    .filter((locker) => locker.status === "free")
                                    .map((locker) => (
                                        <MenuItem key={locker.id} value={locker.id.toString()}>
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
                </div>
                {successMessage && <p><Alert severity="success">{successMessage}</Alert></p>}
                {errorMessage && <p><Alert severity="error">{errorMessage}</Alert></p>}
            </div>
        </Box>
    );
}

export default ParcelDetails;
