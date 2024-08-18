import React, { useContext } from "react";
import AuthContext from "../context/auth-context";

const BookingsPage = () => {
    const { token } = useContext(AuthContext);
    console.log(token)
    return (
        <div>
            BookingsPage {token}
        </div>
    )
}

export default BookingsPage;