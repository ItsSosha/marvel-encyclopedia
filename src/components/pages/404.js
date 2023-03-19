import { Link } from "react-router-dom"
import Error from "../error/error"

export default function NotFound() {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", rowGap: "10px"}}>
            <Error />
            <h2 style={{textAlign: "center"}}>Page not found</h2>
            <Link style={{display: "block", fontSize: "20px"}}to="/">Return to the main page</Link>
        </div>

    )
}