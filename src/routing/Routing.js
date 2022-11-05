import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Conclusion from "../components/conclusion/Conclusion"
import Header from "../components/header/Header"
import DestinationPick from "../pages/destinationPick/DestinationPick"
import Trip from "../pages/trip/Trip"

export default function Routing() {
    const [selection, setSelection] = useState(null);
    const [tripInfo, setTripInfo] = useState(null);

    function handleSelection(destination) {
        setSelection(destination);
    }

    function onTripFinished(tripValues) {
        setTripInfo({ ...selection, ...tripValues });
    }

    return <BrowserRouter>
        <Routes>
            <Route index element={<Header />} />
            <Route path="/destination" element={<DestinationPick handleSelection={handleSelection} selection={selection} />} />
            <Route path="/trip" element={<Trip destination={selection} onTripFinished={onTripFinished} />} />
            <Route path="/conclusion" element={<Conclusion tripInfo={tripInfo} />} />
        </Routes>
    </BrowserRouter>
}