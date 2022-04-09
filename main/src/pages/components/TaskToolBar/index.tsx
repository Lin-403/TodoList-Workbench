
import './index.less'

import { useEffect, useState } from 'react';
import { SortIcon } from '@/components/Icon';
import { MENU_KEY } from '@/const';
import { Button, Dropdown, Menu, Popover } from 'antd';



interface IProps {
     //   onSelect:(key:number)=>void
     tab: number;
     onClick:(key:string)=>void
}

export default function TaskToolBar(props: IProps) {
     //   const {onSelect}=props
     const { tab,onClick } = props


     const renderTools = () => {
          if ([MENU_KEY.DOING, MENU_KEY.DONE].includes(tab)) {
               const menu = (
                    <Menu onClick={(e)=>onClick(e.key)}>
                         <Menu.Item key={'sort-start'}>按事项开始时间排序</Menu.Item>
                         <Menu.Item key={'sort-end'}>按事项截止时间排序 </Menu.Item>
                    </Menu>
               )
               return (
                    <Dropdown overlay={menu} placement="bottomRight">
                         <div className='task-tool-icon'>
                              <SortIcon active={false} />
                         </div>
                    </Dropdown>



               )
          }
     }
     return (
          <div className='task-tool-bar'>
               <div className='task-tool-bar_content'>
                    {renderTools()}
               </div>
          </div>
     )
}
