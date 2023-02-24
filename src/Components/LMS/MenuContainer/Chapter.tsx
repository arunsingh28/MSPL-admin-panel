import React from 'react'

const Chapter = () => {

    const [disable, setDisable] = React.useState(true)
    const [showChapter, setShowChapter] = React.useState(false)
    const [chapter, setChapter] = React.useState(0)

    const handleDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapter(Number(e.target.value))
        if (e.target.value.length >= 1) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    return (
        <div>
            <h4 className='py-3 px-3 font-semibold text-gray-700 uppercase'>Chapter</h4>
            <hr />
            <div className='p-2'>
                <label>Number of Chapter is</label>
                <input type="text" disabled={showChapter} maxLength={2} value={chapter} max={2} minLength={2} onChange={handleDisable} className='w-10 border' /><br />
            </div>
            {/* chapter title */}
            <div className='overflow-scroll h-[460px]'>
            {
                showChapter ? <ChapterForm formLength={chapter}/> : <button className={disable ? 'bg-gray-500 text-white px-8 py-1 rounded mt-5 ml-2' : 'bg-blue-500 text-white px-8 py-1 rounded mt-5 ml-2'} onClick={()=> setShowChapter(true)} disabled={disable}>Next</button> 
            }
            </div>
        </div>
    )
}

export default Chapter


const ChapterForm = ({formLength}:any) => {

    const [form, setForm] = React.useState<any>(formLength)
    
    React.useEffect(()=>{
    },[formLength])
    // delete the particular chapter from the formLength
    let g = 1;

    const handleDelete = (e:any) => {
        formLength = formLength - e
        setForm(formLength)
    }




    return(
        <div className='p-2'>
            <div className='mx-5'>
                {
                    [...Array(form)].map((e, i) => {
                        return (
                            <div key={i} className="mt-3">
                                <div className='flex justify-between items-center'>
                                 <label>{i+1}<sup>th</sup> Chapter Title</label>
                                    <button className='text-red-400 text-sm mr-2 hover:underline' onClick={()=>handleDelete(i)}>Delete</button>
                                </div>
                                <input type="text" className='w-full border h-10 rounded-md mb-1 px-2' placeholder='Enter the Title' />
                            </div>
                        )
                    })
                }
                <button className='uppercase px-5 py-2 bg-blue-500 mt-2 rounded-md text-gray-50'>Save</button>
            </div>
        </div>
    )
}