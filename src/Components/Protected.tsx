import { Navigate } from "react-router-dom";
import React from "react";
import { authContext } from '../Pages/Login'

const Protected = ({ children }: any) => {
    const { isLoggedIn } = React.useContext(authContext);

    React.useEffect(()=>{
        console.log('auth State',isLoggedIn)
    },[isLoggedIn])

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default Protected;