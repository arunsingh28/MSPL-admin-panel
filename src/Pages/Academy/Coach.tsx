import React from 'react'
import { ParentCompProps } from '../Dashboard'

const Coach = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    React.useEffect(()=>{
        // call api to get data
    },[])

    return (
        <div>
            <h1 className='text-2xl text-gray-700 font-semibold pb-2'>Coache</h1>
        </div>
    )
}

export default Coach