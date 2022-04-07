
import './index.less'

import { useEffect, useState } from 'react';
import { CalendarIcon, ListIcon } from '@/components/Icon';
import { VIEW_MODE } from '@/const';


interface IProps{
//   onSelect:(key:number)=>void
}

export default function TaskToolBar(props:IProps) {
//   const {onSelect}=props
  return (
      <div className='task-tool-bar'>
            <div className='task-tool-bar_content'>
               
               <div className="task-list-icon" >
                    <ListIcon />
               </div>
               <div className="task-calendar-icon" >
                    <CalendarIcon />
               </div>
               
            </div>
      </div>
  )
}
