import { Navigate, Outlet, useLocation, } from "react-router-dom";
import React from "react";
import { useSelector } from 'react-redux'


const Protected = ({ allowdRole }: any) => {
    const location = useLocation();

    // fething the state from redux store
    const auth = useSelector((state: any) => state.auth)

    const getAuth = localStorage.getItem('isAuth',)
    const localAuth = JSON.parse(getAuth || '{}')
    console.log(localAuth)


    return auth.user?.role?.find((role: any) => allowdRole?.includes(role))
        ?  <Outlet /> : <Navigate to="/not-allowed" state={{ from: location }} replace />

};
export default Protected;