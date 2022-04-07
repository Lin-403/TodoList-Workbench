
import TaskItem from './components/TaskItem';
import './index.less'

import { Button, Calendar, Empty, Input, message } from 'antd'
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import { PlusIcon } from '@/components/Icon';
import TaskDetail from './components/TaskDetail';
import QuickDatePicker from './components/QuickDatePicker';
import apiConfig from '@/api/config';
moment.suppressDeprecationWarnings = true;
import { api, getApi, postApi } from '@/api/index'
import { API_RESULT, MENU_KEY, TASK_STATUS, VIEW_MODE } from '@/const';
import TaskCreator from './components/TaskCreator';


export type TaskT = {
  taskID: string
  title: string
  desc: string
  startTime: moment.Moment;
  endTime: moment.Moment
  status: number
  finishTime: moment.Moment | ''
}

interface IProps {
  activeKey: number,
  onCountChange: () => void
}

export default function TaskList(props: IProps) {

  const { activeKey, onCountChange } = props
  const [tasks, setTasks] = useState<TaskT[]>([])
  const [activeTaskKey, setActiveTaskKey] = useState('')

  useEffect(() => {
    getLatestList()
  }, [activeKey])

  useEffect(() => {
    onCountChange?.()
  }, [tasks.length])

  //获取json数据
  const getLatestList = () => {
    getApi(apiConfig.list.url, {
      type: activeKey
    }).then(res => {
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



  const handleCreate = (newTask: TaskT) => {


    //点击创建，创建成功的话直接提交到后端
    postApi(apiConfig.create.url, newTask).then((data: any) => {
      //提交请求成功
      getLatestList()

      message.success('创建成功')
    }).catch((e: any) => {
      //提交请求失败
      console.log(e)
    })


  }



  const handleFinish = (taskID: string) => {
    const finishedTask = tasks.find((i) => i.taskID === taskID)
    handleModify(Object.assign({}, finishedTask, {
      status: activeKey === MENU_KEY.DOING ? TASK_STATUS.DONE : TASK_STATUS.DOING,

      finishTime: activeKey === MENU_KEY.DOING ? moment() : ''
    }))
  }

  const handleRemove = (taskID: string) => {
    //点击创建，创建成功的话直接提交到后端
    postApi(apiConfig.remove.url, {
      taskID,
      type: activeKey
    }).then((res: any) => {
      //提交请求成功
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
    postApi(apiConfig.update.url, {
      ...values,
      type: activeKey
    }).then((res: any) => {
      //提交请求成功
      if (res.code === API_RESULT.SUCCESS) {
        message.success('修改成功')
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

  return (
    <div className='task-list'>
      {activeKey === MENU_KEY.DOING && <TaskCreator onCreate={handleCreate} />}
      <div className='task-item_container'>
        {
          tasks.map(i => {
            return (<TaskItem
              key={i.title}
              
              task={i}
              onRemove={() => handleRemove(i.taskID)}
              onFinish={() => handleFinish(i.taskID)}
              onMore={() => setActiveTaskKey(i.taskID)}
              active={activeTaskKey === i.taskID} />)
          })

        }
        {
          !tasks.length && <Empty description={activeKey === MENU_KEY.DOING ? '暂无待办事项' : '还没有完成的任务'} />
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
