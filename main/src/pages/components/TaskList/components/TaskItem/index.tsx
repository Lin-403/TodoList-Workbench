import './index.less'
import moment from 'moment'
import { TaskT } from '../..'
import { useMemo } from 'react'
import { TASK_STATUS } from '@/const'

moment.locale('zh-CN')

interface IProps {
    task:TaskT,

    active: boolean
    onMore: () => void
    onRemove:()=>void
    onFinish:()=>void
    // status:'doing'|'done'
}

export default function TaskItem(props: IProps) {
    const {onFinish,task,onRemove,  active = false, onMore } = props
    const {endTime,title,status}=task
    const timeoutFlag=useMemo(()=>{
        // diff 比较截止时间-moment()时间，小于0，则超时。
        return endTime.diff(moment())<0
    },[endTime])
     
    return (
        <div className={`task-item ${active ? 'task-item--active' : ''}`}>
            <div  onClick={onMore} className='task-item_info'>
                <div className={`task-item_title${timeoutFlag?'--timeout':""}`}>{title}</div>
                <div className='task-item_date'>  
                    <div className='task-item_ddl tag'>
                         {endTime.format('Y-M-D HH:mm:ss')}
                    </div>              
                    {
                        timeoutFlag?
                        <div className='task-item_timeout tag'>
                        {`${endTime.fromNow()}已截止`}
                        </div>
                        :''
                    }
                </div>
                {/* <div className='task-item_desc'>{desc}</div> */}
            </div>
            <div className='task-item_status'>

                    <button
                     onClick={onFinish} 
                     className='task-item_finish-btn'>
                        {status===TASK_STATUS.DOING?'完成':'重启'}
                    </button>

                    <button  
                     onClick={onRemove} 
                    className='task-item_del-btn'
                    >
                        删除
                    </button>
            </div>
        </div>
    )
}