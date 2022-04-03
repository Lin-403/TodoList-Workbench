
import TaskItem from './components/TaskItem';
import './index.less'

import { Button, DatePicker, Drawer, Input, message, Tag } from 'antd'
import { PlusIcon } from '@/components/Icon';
import { useMemo, useState } from 'react';
import moment from 'moment';
import { quickTimeConfig } from './config';
import TaskDetail from './components/TaskDetail';
import QuickDatePicker from './components/QuickDatePicker';
// const moment =require('moment')
moment.suppressDeprecationWarnings = true;

export type TaskT = {
  taskID: string
  title: string
  desc: string
  endTime: moment.Moment
}

export default function TaskList() {
  const [isCreate, setIsCreate] = useState(false)
  const [curTitle, setCurTitle] = useState('')
  const [ddl, setDDL] = useState<moment.Moment>(moment())
  const [tasks, setTasks] = useState<TaskT[]>([])
  const [activeTaskKey, setActiveTaskKey] = useState('')

  // const onChange = (value: any, dateString: string) => {
  //   console.log('Selected Time: ', value);
  //   console.log('Formatted Selected Time: ', dateString);
  // }

  const activeTask = useMemo(() => {
    return tasks.find(i => i.taskID === activeTaskKey)
  }, [tasks, activeTaskKey])



  const handleCreate = () => {
    const taskID = Date.now().toString()
    setTasks([...tasks, {
      title: curTitle,
      endTime: ddl,
      desc: '',
      taskID
    }])
    setIsCreate(false)
    setCurTitle('')
    message.success('创建成功')
  }



  const handleFinish = (taskID: string) => {
    setTasks([...tasks.filter(i => i.taskID !== taskID)])
  }

  const handleRemove = (taskID: string) => {
    setTasks([...tasks.filter(i => i.taskID !== taskID)])
  }

  const handleModify=(values:TaskT)=>{
     setTasks([...tasks.filter(i => i.taskID !== activeTaskKey),values])
    message.success('修改成功')
  }

  return (
    <div className='task-list'>
      <div className={`add-task-container ${isCreate ? 'add-task-container--active' : ''}`}>
        <div className='standard-container create-input'>
          <PlusIcon />
          <Input
            onFocus={() => { setIsCreate(true) }}
            // onBlur={()=>{setIsCreate(false)}}
            placeholder='创建待办事项'
            style={{ marginLeft: '10px' }}
            onChange={e => {
              // console.log(e.target.value)
              setCurTitle(e.target.value)
            }}
            value={curTitle}
          />
        </div>
        {
          isCreate && (
            <>
            <QuickDatePicker
             value={ddl}
             onChange={(m)=>setDDL(m)}
            />

            <div className='operation-btns'>
            <Button
              size="small"
              onClick={() => { setIsCreate(false); setCurTitle('')}}
              style={{ marginRight: '5px' }}
            >
              取消</Button>
            <Button
              
              size="small"
              type="primary"
              onClick={handleCreate}
              disabled={curTitle === ''}
            >
              创建</Button>
          </div>
          </>)

        }
      </div>


      <div className='task-item_container'>
        {
          tasks.map(i => {
            return (<TaskItem
              key={i.title}
              title={i.title}
              endTime={i.endTime}
              onRemove={()=> handleRemove(i.taskID)}
              onFinish={() => handleFinish(i.taskID)}
              onMore={() => setActiveTaskKey(i.taskID)}
              active={activeTaskKey === i.taskID} />)
          })
        }
      </div>
      <TaskDetail
        task={activeTask}
        onClose={() => setActiveTaskKey('')}
        onSubmit={handleModify}
      />


    </div>
  );
}
