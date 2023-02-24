import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AddIcon from '@mui/icons-material/Add';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Modules from './Modules';
import NameModules from './NameModules';
import InitTutorial from './initTutorial';
import DesignModule from './DesignModule';
import { useSelector } from 'react-redux'


const Tutorial = () => {

    const tutorial = useSelector((state: any) => state.tutorial)

    console.log(tutorial)

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="#" className='flex items-center gap-1'>
                    <RssFeedIcon fontSize='small' />
                    <p className='-mb-1'>Blog</p>
                </Link>
                <Link to="/blog/new" className='text-gray-700 flex items-center gap-1'>
                    <AddIcon fontSize='small' />
                    <p className='-mb-1'>New</p>
                </Link>
                <Link to="/blog/new/tutorial" className='text-gray-800 flex items-center gap-1'>
                    <FileOpenIcon fontSize='small' />
                    <p className='-mb-1'>Tutorial</p>
                </Link>
            </Breadcrumbs>

            <br />
            <hr />

            <div className='my-5'>
                <h4 className='text-xl text-gray-700 font-semibold'>Design Tutorial</h4>
                {/* progress timeline */}


                {/* tabs */}
                <div className='pt-10 px-2'>
                    <div className='flex justify-center items-center gap-3'>
                        <div className={!tutorial.initTutorial ? 'bg-blue-200 px-5 py-2 uppercase border rounded-md text-center cursor-not-allowed' : ' bg-gray-200 text-gray-700 border-gray-500 px-5 py-2 uppercase border rounded-sm text-center cursor-pointer'}>
                            <span className='text-sm'>init Tutorial</span>
                        </div>
                        <div className='relative'>
                            <div className='w-[100px] bg-gray-400 h-[1px]'>
                                <div className='w-[10px] absolute bottom-[3px] -right-[2px] bg-gray-400 h-[1px] rotate-45'></div>
                                <div className='w-[10px] absolute top-[3px] -right-[2px] bg-gray-400 h-[1px] -rotate-45'></div>
                            </div>
                        </div>
                        <div className={!tutorial.createModule ? 'bg-blue-200 px-5 py-2 uppercase border rounded-md text-center cursor-not-allowed' : ' bg-gray-200 text-gray-700 border-gray-500 px-5 py-2 uppercase border rounded-sm text-center cursor-pointer'}>
                            <span className='text-sm'>Create Modules</span>
                        </div>
                        <div className='relative'>
                            <div className='w-[100px] bg-gray-400 h-[1px]'>
                                <div className='w-[10px] absolute bottom-[3px] -right-[2px] bg-gray-400 h-[1px] rotate-45'></div>
                                <div className='w-[10px] absolute top-[3px] -right-[2px] bg-gray-400 h-[1px] -rotate-45'></div>
                            </div>
                        </div>
                        <div className={!tutorial.nameModule ? 'bg-blue-200 px-5 py-2 uppercase border rounded-md text-center cursor-not-allowed' : ' bg-gray-200 text-gray-700 border-gray-500 px-5 py-2 uppercase border rounded-sm text-center cursor-pointer'}>
                            <span className='text-sm'>Name Modules</span>
                        </div>
                        <div className='relative'>
                            <div className='w-[100px] bg-gray-400 h-[1px]'>
                                <div className='w-[10px] absolute bottom-[3px] -right-[2px] bg-gray-400 h-[1px] rotate-45'></div>
                                <div className='w-[10px] absolute top-[3px] -right-[2px] bg-gray-400 h-[1px] -rotate-45'></div>
                            </div>
                        </div>
                        <div className={!tutorial.designModule ? 'bg-blue-200 px-5 py-2 uppercase border rounded-md text-center cursor-not-allowed' : 'bg-gray-100 border-gray-500 px-5 py-2 uppercase border rounded-sm text-center cursor-pointer'}>
                            <span className='text-sm'>Design Chapter</span>
                        </div>
                        <div className='relative'>
                            <div className='w-[100px] bg-gray-400 h-[1px]'>
                                <div className='w-[10px] absolute bottom-[3px] -right-[2px] bg-gray-400 h-[1px] rotate-45'></div>
                                <div className='w-[10px] absolute top-[3px] -right-[2px] bg-gray-400 h-[1px] -rotate-45'></div>
                            </div>
                        </div>
                        <div className={!tutorial.writeModule ? 'bg-blue-200 px-5 py-2 uppercase border rounded-md text-center cursor-not-allowed' : ' bg-gray-200 text-gray-700 border-gray-500 px-5 py-2 uppercase border rounded-sm text-center cursor-pointer'}>
                            <span className='text-sm'>Wtite Content</span>
                        </div>
                    </div>
                    {/* tab */}
                    {
                        tutorial.initTutorial ? <InitTutorial /> : null
                    }
                    {
                        tutorial.createModule ? <Modules /> : null
                    }
                    {
                        tutorial.nameModule ? <NameModules /> : null
                    }
                    {
                        tutorial.designModule ? <DesignModule /> : null
                    }
                    {
                        tutorial.writeModule ? 'write module' : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Tutorial