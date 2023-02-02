import { useState } from "react"
import { BsArrowDownShort } from 'react-icons/bs'
import {Link} from 'react-router-dom'


export default function SidebarItem({ item }: any) {
    const [open, setOpen] = useState(false)

    if (item.childrens) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title -mb-5 px-1 py-1 flex items-center">
                    <span className="text-gray-300">
                        {item.icon && <i className={item.icon}></i>}
                        {item.title}
                    </span>
                    <BsArrowDownShort className="bi-chevron-down toggle-btn text-white" onClick={() => setOpen(!open)} />
                </div>
                <div className="sidebar-content mt-5">
                    {item.childrens.map((child: any, index: number) => <SidebarItem key={index} item={child} />)}
                </div>
            </div>
        )
    } else {
        return (
            <Link to={item.path} className="py-2 block px-1 plain text-gray-300 sidebar-item">
                {item.icon && <i className={item.icon}></i>}
                <span className="ml-2">
                {item.title}
                </span>
            </Link>
        )
    }
}