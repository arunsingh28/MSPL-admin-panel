import React from 'react'
import { ParentCompProps } from './Dashboard'
import { Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '../http/api'
import LinearProgress from '@mui/material/LinearProgress';
import loginSound from '../Assets/sounds/login.mp3'
import useSound from 'use-sound'
import { useDispatch } from 'react-redux'
import { auth } from '../store/slices/authSlice'


const Login = ({ title, content }: ParentCompProps) => {

  const [play] = useSound(loginSound)

  React.useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content)
  }, [content, title])

  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'


  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const [cred, setCred] = React.useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    login(cred).then((data: any) => {
      console.log(data.data)
      if (data.data.success) {
        // dispatch Auth ----------------------
        dispatch(auth({
          user: data.data.user,
          token: data.data.accessToken,
          isAuthenticated: true
        }))

        // set this auth value to local storage
        localStorage.setItem('userState', JSON.stringify({
          data: data.data,
          token: data.data.accessToken,
          isAuthenticated: true
        }))

        setLoading(false)
        // play sound if user set to true
        if (data.data.user.isMute.loginNotification) {
          play()
        }
        if (data.data.user.role.length === 8) {
          return navigate('/users', { replace: true })
        } else {
          return navigate(from, { replace: true })
        }
      } else {
        setError(data.data.message || 'Invalid Credentials')
        setLoading(false)
        return navigate('/login')
      }
    }).catch((err: any) => {
      if (err.response?.status === 401) {
        setError(err.response.data.message)
        setLoading(false)
        return navigate('/login')
      }
      setError(err.message)
      setLoading(false)
      return navigate('/login')
    })
  }



  return (
    <>
      <div className="antialiased bg-gray-200 h-screen text-gray-900 font-sans">
        <div className="flex items-center h-screen w-full">
          <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded relative" role="alert">{error}</div>}
            <form className="mb-4" method="post">
              <div className="mb-4 md:w-full">
                <label className="block text-xs mb-1">Username or Email</label>
                <input className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  value={cred.email}
                  onChange={(e) => setCred({ ...cred, email: e.target.value })}
                  type="email" name="email" id="email" placeholder="Username or Email" />
              </div>
              <div className="mb-6 md:w-full">
                <label className="block text-xs mb-1">Password</label>
                <input className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  value={cred.password}
                  onChange={(e) => setCred({ ...cred, password: e.target.value })}
                  type="password" name="password" id="password" placeholder="Password" />
              </div>
              {
                loading && loading ? <LinearProgress /> : <Button color='primary' variant='contained' sx={{ background: '#1b356b', paddingX: 6, paddingY: 2, width: '100%' }} onClick={handleLogin}>Login</Button>
              }

            </form>
            <a className="text-blue-700 text-center text-sm" href="/login">Forgot password?</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login