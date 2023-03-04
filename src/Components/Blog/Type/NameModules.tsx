import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nameModule } from '../../../store/slices/TutuorialSlice'
import { Button, TextField } from '@mui/material'
import { initModuleName, getTut } from '../../../http/api'
import CircularProgress from '@mui/material/CircularProgress';

const NameModules = () => {

  const textEl = React.useRef<HTMLInputElement>(null)

  const tutorial = useSelector((state: any) => state.tutorial)

  const [btnDis, setBtnDis] = React.useState(true)
  const [data, setData] = React.useState(Array(tutorial.modules).fill(''))
  const [dataDescription, setDataDescription] = React.useState(Array(tutorial.moduleDescription).fill(''))

  const dispatch = useDispatch()

  React.useEffect(() => {
    console.log('tut', tutorial)
    getTut().then(res => {
      console.log('sd', res)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const handleNext = () => {
    initModuleName({
      name: tutorial.name,
      moduleName: data,
      moduleDescription: dataDescription
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })


    dispatch(nameModule({
      name: tutorial.name,
      description: tutorial.description,

      modules: tutorial.modules,
      moduleNames: data,
      moduleDescription: dataDescription
    }))
    console.log(tutorial)
  }


  React.useEffect(() => {
    textEl.current?.focus()
  }, [])

  // input for module name with array of modules
  const handleName = (e: any) => {
    const { value } = e.target
    setData({
      ...data,
      [e.target.name]: value
    })
    if (data.length === tutorial.modules) {
      setBtnDis(false)
    }
  }

  const handleDesc = (e: any) => {
    const { value } = e.target
    setDataDescription({
      ...dataDescription,
      [e.target.name]: value
    })
    if (dataDescription.length === tutorial.modules) {
      setBtnDis(false)
    }
  }

  return (
    <>
      <p className='font-bold  text-sm text-gray-800  py-3 w-full px-3 rounded-sm mt-8 font-sans'>
        {/* <span className='italic font-bold '>Info </span> */}
        Module Name Will Also treat As Chapter Name*</p>
      <div className='px-2 w-full'>
        {
          Array(tutorial.modules).fill(0).map((_, i) => {
            return (
              <div key={i}>
                <p className='text-gray-700 font-semibold mt-3'>{i + 1} Module </p>
                <div className="w-full mt-2 bg-gray-50 p-2 rounded-sm">
                  <p className='text-sm font-semibold'>Title</p>
                  <TextField type="text" name={i.toString()} onChange={handleName} sx={{ marginTop: 1, background: '#fff  ' }} ref={textEl} placeholder='Enter Module Name' fullWidth />
                  <p className='text-sm font-semibold mt-2'>Describe</p>
                  <textarea className='border w-full h-28 rounded-sm p-2' name={i.toString()} onChange={handleDesc} placeholder="Descibe the lesson" />
                </div>
              </div>
            )
          })
        }
        <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 3 }} size='large' disabled={btnDis} onClick={handleNext}>Next</Button>

      </div>
    </>
  )
}

export default NameModules