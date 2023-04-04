import { refreshToken } from '../http/api'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { useEffect } from 'react'
import { auth } from '../store/slices/authSlice'

const useRefreshToken = () => {
    const dispatch = useAppDispatch()
    const { token, user, isAuthenticated } = useAppSelector(state => state.auth)

    const refresh = async () => {
        try {
            const { data } = await refreshToken()
            console.log(data)
            dispatch(auth({
                user,
                token: data.accessToken,
                isAuthenticated: true,
            }))

        } catch (err) {
            console.log(err)
        }
    }
}


export default useRefreshToken