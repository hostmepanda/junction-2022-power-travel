import { Button, Card, CardActions, CardContent, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StraightenIcon from '@mui/icons-material/Straighten';
import { AccessTime, Bolt, EnergySavingsLeaf, Euro, Place } from "@mui/icons-material";

export default function DestinationInfo({ destination }) {
    const navigate = useNavigate();

    if (!destination) return '';

    function onConfirm() {
        navigate('/trip');
    }

    return <Card>
        <CardContent>
            <TextField
                defaultValue="Destination"
                value={destination.destination}
                fullWidth
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Place />
                        </InputAdornment>
                    )
                }}
            />
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
            <TextField
                defaultValue="Time"
                value={`${Number(destination.spendHours * 60).toFixed(0)} minutes`}
                fullWidth
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccessTime />
                        </InputAdornment>
                    )
                }}
            />
            <TextField
                defaultValue="Distance"
                value={`${Number(destination.distance / 1000).toFixed(2)}km`}
                fullWidth
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <StraightenIcon />
                        </InputAdornment>
                    )
                }}
            />
            <TextField
                defaultValue="Energy Needed"
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
            <TextField
                defaultValue="Produced Energy"
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
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
            <Button size="medium" variant="contained" onClick={onConfirm}>Confirm</Button>
        </CardActions>
    </Card>
}