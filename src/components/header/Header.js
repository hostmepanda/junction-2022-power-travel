import { Link } from "react-router-dom";

export default function Header() {
    return <div>
        <h1>Company Name</h1>
        <nav>
            <Link to="/home">Home</Link>
            <Link to="/destination">Destination</Link>
            <Link to="/trip">Trip</Link>
        </nav>
    </div>
}