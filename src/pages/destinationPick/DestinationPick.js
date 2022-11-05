import { Card, CardContent, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import DestinationInfo from "../../components/destinationInfo/DestinationInfo";
import mockedData from '../../data/mockedData.json';

export default function DestinationPick({ handleSelection, selection }) {
    const { case1 } = mockedData;
    const selectedCase = case1;
    const [startingPoint, setStartingPoint] = useState(0);
    const [endingPoint, setEndingPoint] = useState(0);

    function handleOnStartingPointChange(event) {
        setStartingPoint(event.target.value);
    }

    function handleOnEndingPointChange(event) {
        setEndingPoint(event.target.value);
        handleSelection({
            ...selectedCase.travelDetails,
            priceReductionSteps: selectedCase.priceReductionSteps,
            destination: selectedCase.endingPoint
        });
    }

    return <Card>
        <CardContent>
            <Typography variant="h5" component="div">Destination</Typography>
            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                <Select
                    value={startingPoint}
                    onChange={handleOnStartingPointChange}
                    placeholder="Select your destination"
                >
                    <MenuItem disabled value={0}>
                        <em>Select Your Location</em>
                    </MenuItem>
                    <MenuItem value={selectedCase.startingPoint}>{selectedCase.startingPoint}</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                <Select
                    value={endingPoint}
                    onChange={handleOnEndingPointChange}
                    placeholder="Select your destination"
                >
                    <MenuItem disabled value={0}>
                        <em>Select Your Destination</em>
                    </MenuItem>
                    <MenuItem value={selectedCase.endingPoint}>{selectedCase.endingPoint}</MenuItem>
                </Select>
            </FormControl>
            <DestinationInfo destination={selection} />
        </CardContent>
    </Card>
}