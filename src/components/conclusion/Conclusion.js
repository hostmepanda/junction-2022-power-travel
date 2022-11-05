import { EnergySavingsLeafOutlined, Euro, TaskAlt } from "@mui/icons-material";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import StraightenIcon from '@mui/icons-material/Straighten';

export default function Conclusion({ tripInfo }) {

    return !tripInfo ? 'Invalid' : <Card>
        <CardContent style={{ marginTop: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><TaskAlt style={{ fontSize: '4rem', fill: 'lightgreen' }} /></div>
            <Typography variant="h4" textAlign="center" fontWeight="bold">You have arrived to your destination</Typography>
            <Grid container marginTop="3rem" >
                <Grid item xs={12} display="flex" alignItems="center">
                    <StraightenIcon style={{ fontSize: '2.5rem' }} />
                    <Typography variant="h6" fontWeight="bold" marginLeft="0.5rem">{Number(tripInfo.distance / 1000).toFixed(2)} km travelled</Typography>
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                    <Euro style={{ fontSize: '2.5rem' }} />
                    <Typography variant="h6" fontWeight="bold" marginLeft="0.5rem">
                        {Number(tripInfo.price).toFixed(2)}{' - '}
                        {Number(tripInfo.moneySaved).toFixed(2)}{' = '}
                        {Number(tripInfo.price - tripInfo.moneySaved).toFixed(2)}
                    </Typography>
                </Grid>
                <Grid item xs={12} display="flex" alignItems="center">
                    <EnergySavingsLeafOutlined style={{ fill: 'green', fontSize: '2.5rem' }} />
                    <Typography variant="h6" marginLeft="0.5rem" fontWeight="bold">{Number(tripInfo.energyGenerated).toFixed(2)} Wh</Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}
