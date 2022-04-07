import { ReactNode } from 'react'
import './index.less'
//定义一个接口规范props的类型
interface IProps{
    name:string 
    count:number 
    active:boolean
    icon?:(active:boolean)=>ReactNode
    onClick:()=>void
}

export default function MenuItem(props:IProps){
    const {name,count,icon,active,onClick}=props
    return (
        <button className={`menu-item ${active?'menu-item--active':''}`}
            onClick={onClick}
            >
            {icon?.(active)}
            <span className='menu-item_name'>{name}</span>
            {count>0&&(
            <span className='menu-item_count'>{count}</span>)}
        </button>
    )
}