import React from 'react'
import { fetchModules, updateModuleContent } from '../../../http/api'
import { useAppSelector } from '../../../store/hook'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';


const Lesson = () => {
  const { token } = useAppSelector(state => state.auth)

  const { id } = useParams<{ id: any }>()

  const [modules, setModules] = React.useState<any>([])

  const selectRef = React.useRef<HTMLSelectElement>(null)

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    fetchModules(id, token).then((res: any) => {
      setLoading(true)
      setModules(res.data.data.moduleNames)
    }).catch((err: any) => {
      console.log(err)
    })
  }, [])


  const [content, setContent] = React.useState<string>('')

  const [lesson, setLesson] = React.useState<any>({
    lessonName: modules.moduleName,
    lessonContent: ''
  })

  React.useEffect(() => {
    if (selectRef.current) {
      selectRef.current.click()
    }
  }, [lesson.lessonName])

  const handlechange = (e: any) => {
    setLesson({ ...lesson, lessonName: e.target.value, lessonContent: content })
  }

  const handleNewArray = (e: any) => {
    setContent(e.target.value)
    setLesson({ ...lesson, lessonName: lesson.moduleName, lessonContent: e.target.value })
  }

  const handleSave = () => {
    updateModuleContent(id, lesson, token).then((res: any) => {
      console.log(res.data)
    }).catch((err: any) => {
      console.log(err)
    })
  }
  const fileRef = React.useRef<HTMLInputElement | any>(null)

  const [file, setFile] = React.useState<any>(null)
  const [fileLink, setFileLink] = React.useState<any>(null)

  const [state, setState] = React.useState<boolean>(false)

  // render file in the browser

  const handleFile = () => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }

  const handleChangeFile = () => {
    if (fileRef.current) {
      // check file type
      const fileType = fileRef.current.files[0].type
      if (fileType !== 'application/pdf') {
        toast.error('Only pdf file is allowed')
        return
      }
      setFile(fileRef.current.files)
      const url = URL.createObjectURL(fileRef.current.files[0])
      setState(true)
      setFileLink(url)
    }
  }

  return (
    <div>
      <h4 className='py-3 px-3 font-semibold text-gray-700 uppercase'>Lessons</h4>
      <hr />
      {
        loading ? (
          <>
            <div className='px-2 text-gray-700'>
              <div className='flex flex-col mt-2'>
                <label htmlFor="module" className='text-sm'>Select Module</label>
                <select className='border py-2 mt-1 rounded-md px-1' value={lesson.moduleName} onChange={handlechange} ref={selectRef} onClick={handlechange} name="module" id="module">
                  {
                    modules.map((module: any, index: number) => {
                      return (
                        <option key={index} value={module.moduleName}>{module.moduleName}</option>
                      )
                    })
                  }
                </select>
              </div>
              {/* editor */}
              <div className='mt-2'>
                <textarea className='border w-full px-1 py-1 rounded-sm text-gray-700 text-sm' value={content} onChange={handleNewArray} rows={5} placeholder="Describe the lessons"></textarea>
              </div>
              {/* file */}
              {
                file && (
                  <div className='px-0 py-3'>
                    <div className='flex items-center'>
                      <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                        <PictureAsPdfOutlinedIcon className='text-gray-600' />
                      </div>
                      <div className='ml-3'>
                        <p className='text-gray-700 font-semibold'>{file[0].name}</p>
                        <p className='text-gray-500 text-sm'>{(file[0].size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <div className='border shadow-sm my-2'>
                      <iframe src={fileLink} title='ppt' className='w-full object-contain h-[500px]' />
                    </div>
                  </div>
                )
              }
              <div className='px-3 py-0 flex gap-3'>
                <input type="file" ref={fileRef} className='hidden' onChange={handleChangeFile} />
                {/* <button className='px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-sm text-gray-50 flex items-center gap-1' onClick={handleFile}>
                  {
                    state && <RestartAltOutlinedIcon />
                  }
                  LOAD PDF</button> */}
                {/* {
                  state && <button className='px-7 py-2 bg-indigo-600 rounded-sm text-gray-50 hover:bg-indigo-700 flex items-center gap-2'>
                    <DriveFolderUploadOutlinedIcon />
                    UPLOAD FILE</button>
                } */}
              </div>
              {/* save button */}
              <button className='bg-blue-500 my-2 px-7 py-2 rounded-md text-gray-100' onClick={handleSave}>Save</button>
            </div>
          </>
        ) : <div className='mt-3 ml-3'>
          <CircularProgress size={20} />
        </div>
      }

    </div>
  )
}

export default Lesson