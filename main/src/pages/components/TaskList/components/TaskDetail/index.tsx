
import { Button, DatePicker, Drawer, Form, Input, message, Tag } from 'antd';

import { useMemo, useState } from 'react';
import { TaskT } from '../..';
import { quickTimeConfig } from '../../config';
import QuickDatePicker from '../QuickDatePicker';
import './index.less'
import { TASK_STATUS } from '@/const';

interface IProps {
    task?: TaskT
    onClose: () => void
    onSubmit:(values:TaskT)=>void
}

export default function TaskDetail(props: IProps) {
    const { task, onClose,onSubmit } = props
    const [title, setTitle] = useState('')
    

    const realTitle = useMemo(() => {
        return title ? title : (task?.title || '')
    }, [title, task])

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value)
    }

    const renderTitle = () => {
        return (
            <Input
                onChange={handleTitleChange}
                name="title"
                value={realTitle} />
        )
    }

    const handleSubmit = (values: any) => {
       console.log(values,'00000')

    //    onSubmit?.(Object.assign({}, values, task))
      if(task){
        onSubmit?.({
            taskID:task.taskID ||'',
            desc:values.desc ||task.desc,
            title:realTitle,
            startTime:values.startTime ||task.startTime,
            endTime:values.endTime ||task.endTime,
            status:task.status,
            finishTime:task.finishTime||''
        })
      }
        onClose()
        console.log('form', values, realTitle)
    }
    return (

        <Drawer title={renderTitle()}
            placement="right"
            onClose={()=>{
                onClose()
                setTitle('')
            }}
            visible={task !== undefined}
            closable={false}
            className='task-detail'
            // destroyOnClose
        >
            <Form 
            initialValues={task}
            name='basic' 
            autoComplete='off' 
            onFinish={handleSubmit}
            onFinishFailed={handleSubmit}
            style={{marginTop:'35px'}}
            >
                <div className='form-item_container'>
                    <div className='form-item_icon'>开始日期</div>
                    <div className='form-item_comp'>
                        <Form.Item name="startTime">
                            <QuickDatePicker />
                        </Form.Item>
                    </div>
               </div>
               <div className='form-item_container'>
                    <div className='form-item_icon'>截止日期</div>
                    <div className='form-item_comp'>
                        <Form.Item name="endTime">
                            <QuickDatePicker />
                        </Form.Item>
                    </div>
               </div>

               <div className='form-item_container'>
                    <div className='form-item_icon'>描述</div>
                    <div className='form-item_comp'>
                        <Form.Item name="desc">
                            <Input.TextArea rows={4} placeholder="待办事项描述" />
                        </Form.Item>
                    </div>
               </div>
               
                <Form.Item>
                    <Button className='submit-btn' type="primary" htmlType="submit" disabled={realTitle===''}>
                        确认修改
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
}
