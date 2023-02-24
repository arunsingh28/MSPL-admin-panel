import React from 'react'
import { ParentCompProps } from './Dashboard'
import { Outlet } from 'react-router-dom'


const Blog = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])
    return (
        <Outlet/>
    )
}

export default Blog