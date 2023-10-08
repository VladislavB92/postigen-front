import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Parcel } from "../../../types/common";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { LinearIndeterminate } from "../Global/LoadingBar";
import BackButton from "../Global/Buttons/BackButton";
import { Grid } from '@mui/material';

function ParcelDetails(): React.ReactElement {
    const { parcelId } = useParams();
    const [parcel, setParcel] = useState<Parcel | null>(null);

    useEffect(() => {
        api.get<Parcel>(`/api/parcels/${parcelId}/`)
            .then((response) => {
                setParcel(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching parcel ${parcelId}:`, error);
            });
    }, [parcelId]);

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
                ) : null}
            </div>
        </Box>
    );
}

export default ParcelDetails;
