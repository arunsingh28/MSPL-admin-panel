import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createModulee } from '../../../store/slices/TutuorialSlice'
import { Button, TextField } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Outlet } from 'react-router-dom';
import { getTut } from '../../../http/api'

const DesignModule = () => {

  const dispatch = useDispatch()
  const chapterEl = React.useRef<any>(null)
  const [chapter, setChapter] = React.useState(0)

  React.useEffect(() => {
    getTut().then(res => {
      if(res.data.info.modules) {
        // dispatch(createModulee({
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const { name, description, moduleNames, modules, moduleDescription } = useSelector((state: any) => state.tutorial)


  const [currentModule, setCurrentModule] = React.useState(moduleNames[0])
  const [currentModuleDesc, setCurrentModuleDesc] = React.useState(moduleDescription[0])

  console.log(currentModuleDesc)

  const [visible, setVisible] = React.useState(false)

  const [open, setOpen] = React.useState(false)

  const handleNext = (moduleName: string, index: number) => {
    setOpen(!open)
    setCurrentModule(moduleName)
    setCurrentModuleDesc(moduleDescription[index])
  }

  React.useEffect(() => {
    chapterEl?.current?.focus()
  }, [])

  React.useEffect(() => {
    setCurrentModule(currentModule)
    setVisible(false)
  }, [currentModule])


  const handleNext1 = () => {
    setVisible(true)
  }

  return (
    <div className='mt-10'>
      <div className='px-2'>
        <h1 className='mt-4 font-bold text-gray-700 px-1 mb-2'>Select Chapter to design</h1>
        <div className='w-1/2 h-12 border rounded-lg flex items-center px-2 relative' onClick={() => setOpen(!open)}>
          <span className='text-gray-700'>{currentModule}</span>
          {
            open ? <ArrowDropUpIcon className='absolute top-2 right-2' /> : <ArrowDropDownIcon className='absolute top-2 right-2' />
          }
          {
            open ? <div className='absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg z-10'>
              {
                Object.keys(moduleNames).map((key, index: number) => {
                  return (
                    <div className='w-full h-10 flex text-gray-700 items-center px-2 cursor-pointer hover:bg-gray-100 text-sm' onClick={() => handleNext(moduleNames[key], index)}>{moduleNames[key]}</div>
                  )
                })
              }
            </div> : null
          }
        </div>


        {/* number chapter */}
        <div className='py-2'>

          <div className='py-4 bg-gray-50 rounded-md px-2 my-5'>
            <h2 className='text-gray-700 font-semibold text-sm underline'>Description</h2>
            <p className='text-md text-gray-600 mt-2'>{currentModuleDesc}</p>
          </div>
          {
            !visible ? <> <label htmlFor="module" className='text-gray-600'>How many Chapter are there in {currentModule} ?</label><br />
              <input type="text" id='module' ref={chapterEl} value={chapter} onChange={(e: any) => setChapter(e.target.value)} placeholder="0" className='border w-[42px] h-10 rounded-md text-xl mt-3 px-1' /> </> : null
          }
          <div className='mt-5'>
            <span className='font-bold italic'>NOTE*</span>
            <p className='text-sm'>You can not change the Modules after declaring the Number of modules so please do it carefully.</p>
            {
              !visible ? <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 3 }} size='large' onClick={handleNext1}>Next</Button> : null
            }
          </div>
        </div>





        {/* outlet */}
        {
          visible ?
            Array(chapter).fill(0).map((_, index) => {
              return (
                <div key={index}>
                  <div className='w-full mt-5'>
                    <label htmlFor="ques" className='px-1 text-gray-700'>{index + 1}Topic</label>
                    <input type="text" className='w-full border h-12 px-2 rounded-lg mt-1' placeholder='Enter your question' />
                    <div className='mt-3'>  <label htmlFor="ques" className='px-1 text-gray-700 pt-5'>Description</label>
                      <textarea className='w-full border h-20 px-2 rounded-lg mt-1 pt-1' placeholder='Describe the topic' />
                    </div>
                  </div>
                </div>
              )
            }) : null
        }
        {/* outlet */}
        {
          visible ? <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 3 }} size='large' onClick={handleNext1}>Next</Button> : null
        }

      </div>
    </div>
  )
}

export default DesignModule