
import './index.less'

import { useEffect, useMemo, useState } from 'react';
import { SortIcon } from '@/components/Icon';
import { MENU_KEY } from '@/const';
import { AutoComplete, Button, Dropdown, Menu, Popover, Select } from 'antd';
import { TaskT } from '..';
const { Option } = Select;



interface IProps {
     //   onSelect:(key:number)=>void
     tasks: TaskT[]
     onClick: (key: string) => void
     onSearch: (key: string) => void
}

export default function TaskToolBar(props: IProps) {
     //   const {onSelect}=props
     const { onSearch, onClick, tasks } = props

     const searchOptions = useMemo(() => {
          return tasks.map(i => ({
               value: i.taskID,
               label: i.title,
          }))
     }, [tasks])

     const renderSearch = () => {
          console.log('renderSearch')
          return (
               <Select
                    className='task-searcher'
                    showSearch
                    placeholder="搜索任务名称"
                    optionFilterProp="children"
                    onChange={onSearch}
                    onSearch={onSearch}
                    allowClear

               >
                    {searchOptions.map(i => (
                         <Option value={i.label} key={i.value}>{i.label}</Option>
                    ))}
               </Select>
          )


     }
     const renderTools = () => {
          const menu = (
               <Menu onClick={(e) => onClick(e.key)}>
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
     return (
          <div className='task-tool-bar'>
               <div className='task-tool-bar_content'>
                    {renderSearch()}
                    {renderTools()}
               </div>
          </div>
     )
}
