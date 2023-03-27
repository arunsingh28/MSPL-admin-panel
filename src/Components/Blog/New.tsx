import React from 'react'
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {useNavigate} from 'react-router-dom'
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';

const New = () => {

    const router = useNavigate()

    const [blogType, setBlogType] = React.useState<string>('blog' || 'tutorial')
    const [disbleBtn, setDisableBtn] = React.useState<boolean>(true)

    const handleTypeBlog = () => {
        if(blogType === 'blog'){
            return router('/blog/new/blog')
        }else{
            return router('/blog/new/tutorial')
        }
    }

    return (
        <div>
            <p className='text-2xl text-gray-700 font-semibold mb-4 bg-white py-2'>Post New Blog</p>
            <hr />
            <div className='flex border-b border-l border-r'>
                <div className='mt-5 mx-4 w-[400px]'>
                    <FormControl>
                        <h4 className='text-gray-700 font-semibold'>Type of Blog</h4>
                        <div className='mt-2'>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="blog" onChange={() => {
                                    setBlogType('blog')
                                    setDisableBtn(false)
                                }} control={<Radio />} label="Blog" />
                                <FormControlLabel value="tutorial" onChange={() => {
                                    setBlogType('tutorial')
                                    setDisableBtn(false)
                                }} control={<Radio />} label="Tutorial" />
                            </RadioGroup>
                        </div>
                        <Button variant="contained" disabled={disbleBtn} sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 3 }} onClick={handleTypeBlog} size='large'>Create <PlayArrowTwoToneIcon fontSize='small'/></Button>
                    </FormControl>
                </div>
                {/* other half */}
                <div className='flex-1 w-full'>
                    {
                        blogType === 'blog' ? <Blog /> : <Tutorial/>
                    }
                </div>
            </div>
        </div>
    )
}

export default New


const Blog = () => {
    return (
        <div className='py-3 border-l w-full bg-blue-50'>
            <h4 className='font-semibold text-gray-700 text-xl border-b px-2 py-2'>Blog</h4>
            <p className='mt-2 text-gray-700 px-2'>This feature allow to create traditional blog.</p>
            <p className='mt-1 text-gray-700 px-2'>Posts are typically displayed in reverse chronological order so that the most recent post appears first.</p>
            <p className='font-semibold text-gray-700 mt-2 px-2'>Blog Structure</p>
            <ul className='ml-5 px-2'>
                <li className='list-disc mt-1 text-sm'>Blog Title</li>
                <li className='list-disc mt-1 text-sm'>Blog Description</li>
                <li className='list-disc mt-1 text-sm'>Blog Category</li>
                <li className='list-disc mt-1 text-sm'>Blog Poster</li>
                <li className='list-disc mt-1 text-sm'>Blog Brif</li>
            </ul>
        </div>
    )
}

const Tutorial = () => {
    return (
        <div className='py-3 border-l w-full bg-blue-50'>
            <h4 className='font-semibold text-gray-700 text-xl border-b px-2 py-2'>Tutorial</h4>
            <p className='mt-2 text-gray-700 px-2'>This feature allow to create tutorial.</p>
            <p className='mt-1 text-gray-700 px-2'>Tutorial are like predefine genral Question/Answer.</p>
            <p className='font-semibold text-gray-700 mt-2 px-2'>Tutorial Structure</p>
            <ul className='ml-5 px-2'>
                <li className='list-disc mt-1 text-sm'>Tutorial Title</li>
                <li className='list-disc mt-1 text-sm'>Tutorial Description</li>
                <li className='list-disc mt-1 text-sm'>Tutorial Question</li>
                <li className='list-disc mt-1 text-sm'>Answer</li>
                <li className='list-disc mt-1 text-sm'>File Sharing :-</li>
                <p className='text-sm'>User can download the text content in pdf</p>
            </ul>
        </div>
    )
}