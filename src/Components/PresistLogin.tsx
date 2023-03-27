import React from 'react'
import { Outlet } from 'react-router-dom'



const PresistLogin = () => {

    // const refresh = use

    const [isLoading, setIsLoading] = React.useState(true)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)

    React.useEffect(() => {
        let isMouted = true
        const verifyRefreshToken = async () => {
            try {
                // await refresh()
            } catch (err) {
                console.log(err)
            }
        }
    }, [])

    return (
        <div>PresistLogin</div>
    )
}

export default PresistLogin