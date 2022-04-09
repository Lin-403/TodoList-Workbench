import './index.less'
import moment from 'moment'
import { TaskT } from '../..'
import { useMemo, useState } from 'react'
import { TASK_STATUS } from '@/const'
import { Button, Form, Input } from 'antd'
import QuickDatePicker from '../QuickDatePicker'

moment.locale('zh-CN')

interface IProps {
    task: TaskT,

    active: boolean
    onMore: () => void
    onRemove: () => void
    onFinish: () => void
    onSubmit: (values: TaskT) => void
    // status:'doing'|'done'
}

export default function TaskItem(props: IProps) {
    const { onFinish, task, onRemove, onSubmit, active = false, onMore } = props
    const { endTime, title, status, startTime, finishTime } = task

    const [edit, setEdit] = useState(false)

    const timeoutFlag = useMemo(() => {
        // diff 比较截止时间-moment()时间，小于0，则超时。
        return endTime.diff(moment()) < 0
    }, [endTime])

    const handleSubmit = (values: any) => {
        console.log(values, '00000')

        //    onSubmit?.(Object.assign({}, values, task))
        if (task) {
            onSubmit?.({
                taskID: task.taskID || '',
                desc: values.desc || task.desc,
                title: values.title||title,
                startTime: values.startTime || task.startTime,
                endTime: values.endTime || task.endTime,
                status: task.status,
                finishTime: task.finishTime || ''
            })
        }
        setEdit(false)
    }

    return (
        <div className={`task-item ${active ? 'task-item--active' : ''}`}>
            <div className='task-item_main'>
                <div onClick={() => setEdit(!edit)} className='task-item_info'>
                    <div className={`task-item_title${timeoutFlag ? '--timeout' : ""}`}>{title}</div>

                    {/* <div className='task-item_desc'>{desc}</div> */}
                </div>
                <div className='task-item_status'>

                    <button
                        onClick={onFinish}
                        className='task-item_finish-btn'
                    >
                        {status === TASK_STATUS.DOING ? '完成' : '重启'}
                    </button>

                    <button
                        onClick={onRemove}
                        className='task-item_del-btn'
                    >
                        删除
                    </button>
                </div>
            </div>

            {
                !edit ? (
                    <div className='task-item_detail'>
                        <div className='task-item_desc'>
                            <label htmlFor="">开始时间</label>
                            <div className='task-item_ddl tag'>
                                {startTime.format('Y-M-D HH:mm:ss')}
                            </div>
                        </div>
                        <div className='task-item_desc'>
                            <label htmlFor="">截止时间</label>
                            <div className='task-item_ddl tag'>
                                {endTime.format('Y-M-D HH:mm:ss')}
                            </div>
                        </div>
                        {
                            finishTime !== '' && (
                                <div className='task-item_desc'>
                                    <label htmlFor="">完成时间</label>
                                    <div className='task-item_ddl tag'>
                                        {finishTime.format('Y-M-D HH:mm:ss')}
                                    </div>
                                </div>
                            )
                        }
                        {timeoutFlag && (
                            <div className='task-item_desc'>
                                <label>截止状态</label>
                                <div className='task-item_timeout tag'> {`${endTime.fromNow()}已截止`}</div>

                            </div>
                        )}

                    </div>
                ) :
                    (<div className='task-item_editor'>
                        <Form
                            initialValues={task}
                            name='basic'
                            autoComplete='off'
                            onFinish={handleSubmit}
                            style={{ marginTop: '35px' }}
                        >
                            <div className='form-item_container'>
                                <div className='form-item_icon'>事项名称</div>
                                <div className='form-item_comp'>
                                    <Form.Item  name="title" 
                                        rules={[{ required: true, message: '事项名称不能为空!' }]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </div>
                            </div>
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
                                <Button className='submit-btn' type="primary" htmlType="submit" >
                                    确认修改
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>)
            }
        </div>
    )
}