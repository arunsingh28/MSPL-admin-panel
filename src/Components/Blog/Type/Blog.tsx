import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AddIcon from '@mui/icons-material/Add';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const Blog = () => {
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
                    <p className='-mb-1'>Blog</p>
                </Link>
            </Breadcrumbs>
            <br />
            <hr />
        </div>
    )
}

export default Blog