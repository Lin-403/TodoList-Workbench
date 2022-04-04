
import TaskItem from './components/TaskItem';
import './index.less'

import { Button, Input, message } from 'antd'
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import { PlusIcon } from '@/components/Icon';
import TaskDetail from './components/TaskDetail';
import QuickDatePicker from './components/QuickDatePicker';
import apiConfig from '@/api/config';
moment.suppressDeprecationWarnings = true;
import { api, postApi } from '@/api/index'
import { API_RESULT } from '@/const';


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

  useEffect(() => {
    getLatestList()
  }, [])
  //获取json数据
  const getLatestList = () => {
    api(apiConfig.list.url).then(res => {
      if (res.code === API_RESULT.SUCCESS) {

        const latestTasks = res.data.map((i: TaskT) => {
          // const momentDDL=moment(i.endTime)
          return Object.assign(i, {
            endTime: moment(i.endTime)
          })
        })
        // console.log(latestTasks)
        setTasks(latestTasks)
      }
      else {

      }
    }).catch(e => {

    })
  }
  // const onChange = (value: any, dateString: string) => {
  //   console.log('Selected Time: ', value);
  //   console.log('Formatted Selected Time: ', dateString);
  // }

  const activeTask = useMemo(() => {
    return tasks.find(i => i.taskID === activeTaskKey)
  }, [tasks, activeTaskKey])



  const handleCreate = () => {
    const taskID = Date.now().toString()
    const newTask = {
      title: curTitle,
      endTime: ddl,
      desc: '',
      taskID
    }

    //点击创建，创建成功的话直接提交到后端
    postApi(apiConfig.create.url, newTask).then((data: any) => {
      //提交请求成功
      // console.log(data.code,'79')
      console.log(data,'data')
      getLatestList()
      setIsCreate(false)
      setCurTitle('')
      message.success('创建成功')
    }).catch((e: any) => {
      //提交请求失败
      console.log(e)
    })


  }



  const handleFinish = (taskID: string) => {
    setTasks([...tasks.filter(i => i.taskID !== taskID)])

  }

  const handleRemove = (taskID: string) => {

    //点击创建，创建成功的话直接提交到后端
    postApi(apiConfig.remove.url, {
      taskID
    }).then((res: any) => {
      //提交请求成功
      console.log(res)
      if (res.code === API_RESULT.SUCCESS) {
        message.success('删除成功')
        getLatestList()
      }
      else {
        message.error(res.msg)
      }

    }).catch((e: any) => {
      //提交请求失败
      console.log(e)
    })
  }

  const handleModify = (values: TaskT) => {
    setTasks([...tasks.filter(i => i.taskID !== activeTaskKey), values])
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
                onChange={(m) => setDDL(m)}
              />

              <div className='operation-btns'>
                <Button
                  size="small"
                  onClick={() => { setIsCreate(false); setCurTitle('') }}
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
              onRemove={() => handleRemove(i.taskID)}
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
