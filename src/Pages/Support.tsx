import React from 'react'
import { ParentCompProps } from './Dashboard'

const Support = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])
    return (
        <div>Support</div>
    )
}

export default Support