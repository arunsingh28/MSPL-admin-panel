import React from 'react'
import { ParentCompProps } from './Dashboard'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PasswordIcon from '@mui/icons-material/Password';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Sound from '../Components/Settings/Sound';
import Password from '../Components/Settings/PasswordChange'
import Profile from '../Components/Settings/Profile';


const Settings = ({ title, content }: ParentCompProps) => {

  React.useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content)
  }, [content, title])

  const [showBody, setShowBody] = React.useState({
    sound: false,
    password: false,
    profile: false
  })

  return (
    <div>
      <h1 className='text-2xl text-gray-700 font-semibold pb-2'>Settings</h1>
      <div>
        {/* sound setting */}
        <div>
          <div className={showBody.sound ? 'flex gap-5  px-10 py-4 rounded-sm border': 'hover:bg-gray-100 bg-blue-50 flex gap-5 px-10 py-4 rounded-sm border'} onClick={()=>{setShowBody({
            sound: !showBody.sound,
            password: false,
            profile: false
          })}}>
            <ArrowRightIcon sx={{ 
              color: '#444',
              transition: 'all 0.3s ease-in-out',
              transform: showBody.sound ? 'rotate(90deg)' : 'rotate(0deg)', 
              }}  />
            <div className='flex justify-between w-full'>
              <p className='text-gray-700'>Sound Settings</p>
              <VolumeUpIcon sx={{ color: '#444' }} />
            </div>
          </div>
          {/* body of sound setting */}
          {
            showBody.sound ? <Sound/> : null
          }
        </div>
        {/* Password */}
        <div>
          <div className={showBody.password ? 'flex gap-5  px-10 py-4 rounded-sm border': 'hover:bg-gray-100 bg-blue-50 flex gap-5 px-10 py-4 rounded-sm border'} onClick={()=>{setShowBody({
            sound: false,
            password: !showBody.password,
            profile: false
          })}}>
            <ArrowRightIcon sx={{ 
              color: '#444',
              transition: 'all 0.3s ease-in-out',
              transform: showBody.password ? 'rotate(90deg)' : 'rotate(0deg)', 
              }}  />
            <div className='flex justify-between w-full'>
              <p className='text-gray-700'>Change Password</p>
                <PasswordIcon sx={{ color: '#444' }} />
            </div>
          </div>
          {/* body of sound setting */}
          {
            showBody.password ? <Password/> : null
          }
        </div>
        {/* edit profile */}
        <div>
          <div className={showBody.password ? 'flex gap-5  px-10 py-4 rounded-sm border': 'hover:bg-gray-100 bg-blue-50 flex gap-5 px-10 py-4 rounded-sm border'} onClick={()=>{setShowBody({
            sound: false,
            password: false,
            profile: !showBody.profile
          })}}>
            <ArrowRightIcon sx={{ 
              color: '#444',
              transition: 'all 0.3s ease-in-out',
              transform: showBody.profile ? 'rotate(90deg)' : 'rotate(0deg)', 
              }}  />
            <div className='flex justify-between w-full'>
              <p className='text-gray-700'>Update Profile</p>
                <AssignmentIndIcon sx={{ color: '#444' }} />
            </div>
          </div>
          {/* body of sound setting */}
          {
            showBody.profile ? <Profile/> : null
          }
        </div>
      </div>
    </div>
  )
}

export default Settings