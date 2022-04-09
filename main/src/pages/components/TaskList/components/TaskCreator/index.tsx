
import './index.less'
import { useState } from 'react';
import { PlusIcon } from '@/components/Icon';
import { Button, Input } from 'antd';
import QuickDatePicker from '../QuickDatePicker';
import moment from 'moment';
import { TaskT } from '../..';
import { TASK_STATUS } from '@/const';

interface IProps {
    onCreate: (t: TaskT) => void
}

export default function TaskCreator(props: IProps) {
    // console.log(config)
    const {onCreate } = props
    const [isCreate, setIsCreate] = useState(false)
    const [curTitle, setCurTitle] = useState('')
    const [ddl, setDDL] = useState<moment.Moment>(moment())

    const handleCreate = () => {
        const taskID = Date.now().toString()
        const newTask:TaskT= {
            title: curTitle,
            startTime: moment(),
            endTime: ddl,
            desc: '',
            taskID,
            status: TASK_STATUS.DOING,
            finishTime:''
        };
        setIsCreate(false)
        setCurTitle('')
        onCreate?.(newTask)
    }

    return (
        <div className={`add-task-container ${isCreate ? 'add-task-container--active' : ''}`}>
            <div className='standard-container create-input'>
                <PlusIcon active={false}/>
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

    );
}
