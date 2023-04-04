import React from 'react'
import { fetchModules, updateModuleContent } from '../../../http/api'
import { useAppSelector } from '../../../store/hook'
import { useParams } from 'react-router-dom'


const Lesson = () => {
  const { token } = useAppSelector(state => state.auth)

  const { id } = useParams<{ id: any }>()

  const [modules, setModules] = React.useState<any>([])

  const selectRef = React.useRef<HTMLSelectElement>(null)

  React.useEffect(() => {
    fetchModules(id, token).then((res: any) => {
      setModules(res.data.data.moduleNames)
      console.log('start', res.data.data.moduleNames[0])
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



  return (
    <div>
      <h4 className='py-3 px-3 font-semibold text-gray-700 uppercase'>Lessons</h4>
      <hr />
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
          <textarea className='border w-full px-1 py-1 rounded-sm text-gray-700 text-sm' value={content} onChange={handleNewArray} rows={16} placeholder="Write Lesson"></textarea>
        </div>
        <button className='bg-blue-500 my-2 px-7 py-2 rounded-md text-gray-100' onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}

export default Lesson