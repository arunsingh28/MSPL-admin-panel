import axios from 'axios'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hook'

const useRefreshToken = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(state => state.auth)
    
    useEffect(() => {
        const interval = setInterval(() => {
            axios.post('http://localhost:5000/api/v1/auth/refresh-token', { token }, { withCredentials: true })
                .then(res => {
                    console.log(res)
                    dispatch({ type: 'SET_TOKEN', payload: res.data.token })
                })
                .catch(err => {
                    console.log(err)
                })
        }, 1000 * 60 * 10)
        return () => clearInterval(interval)
    }, [token, dispatch])
}


export default useRefreshToken