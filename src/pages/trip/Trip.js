/* eslint-disable */
import { Bolt, DragHandle, EnergySavingsLeaf, EnergySavingsLeafOutlined, Euro, Place, Remove } from "@mui/icons-material";
import { Card, CardContent, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DELAY = 2000;
const SAVING_PROGRESS_TIME = 1000;
const DISTANCE_RATE = 500;
const ENERGY_RATE = 0.3;

export default function Trip({ destination, onTripFinished }) {
    if (!destination) return 'Invalid Action';

    const [valuesInTime, setValuesInTime] = useState({
        moneySaved: 0,
        distanceTravelled: 0,
        energyGenerated: 0
    });
    const timerRef = useRef(null);
    const counterRef = useRef(0);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            timerRef.current = setInterval(() => {
                if (valuesInTime.distanceTravelled >= destination.distance) return;
                setValuesInTime(values => ({
                    moneySaved: values.moneySaved + destination.priceReductionSteps[counterRef.current],
                    energyGenerated: values.energyGenerated + ENERGY_RATE,
                    distanceTravelled: values.distanceTravelled < destination.distance ? values.distanceTravelled + DISTANCE_RATE : destination.distance
                }));
                counterRef.current += 1;
            }, SAVING_PROGRESS_TIME);
        }, DELAY)
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        }
    }, []);

    useEffect(() => {
        if (valuesInTime.distanceTravelled >= destination.distance) {
            onTripFinished(valuesInTime);
            navigate('/conclusion');
        }
    }, [valuesInTime])

    return <Card>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12} display="flex" alignItems="center">
                    <Place fontSize="large" /><Typography variant="h6">{destination.destination}</Typography>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Typography variant="h4">{
                        Number((destination.distance - valuesInTime.distanceTravelled) / 1000).toFixed(2)
                    }km</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        defaultValue="Energy"
                        value={`${Number(destination.energyConsumption).toFixed(2)}Wh`}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Bolt />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        defaultValue="Energy"
                        value={`${destination.energyProductionPercent}% - ${Number(destination.energyProduction).toFixed(2)}Wh`}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EnergySavingsLeaf />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        defaultValue="Energy"
                        value={`${Number(valuesInTime.energyGenerated).toFixed(2)}Wh`}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EnergySavingsLeafOutlined />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <TextField
                        defaultValue="Price"
                        value={Number(destination.price).toFixed(2)}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Euro />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end">
                    <TextField
                        defaultValue="Saved"
                        value={Number(valuesInTime.moneySaved).toFixed(2)}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Remove />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-start">
                    <TextField
                        defaultValue="Total"
                        value={Number(destination.price - valuesInTime.moneySaved).toFixed(2)}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DragHandle />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
            </Grid>

        </CardContent>
    </Card>
}
