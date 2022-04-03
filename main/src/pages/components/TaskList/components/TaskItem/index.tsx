import './index.less'
import moment from 'moment'

interface IProps {
    title: string
    desc: string
    // startTime:string 
    endTime: moment.Moment
    active: boolean
    onMore: () => void
    onFinish:()=>void
    // status:'doing'|'done'
}

export default function TaskItem(props: IProps) {
    const {onFinish, title, desc, endTime, active = false, onMore } = props
    return (
        <div className={`task-item ${active ? 'task-item--active' : ''}`}>
            <div  onClick={onMore} className='task-item_info'>
                <div className='task-item_title'>{title}</div>
                <div className='task-item_ddl'>
                    {endTime.format('Y-M-D HH:mm:ss')}
                </div>
                {/* <div className='task-item_desc'>{desc}</div> */}
            </div>
            <div className='task-item_status'>

                    <button
                     onClick={onFinish} 
                     className='task-item_finish-btn'>
                        完成
                    </button>

                    <button  
                   
                    className='task-item_del-btn'
                    >
                        删除
                    </button>
            </div>
        </div>
    )
}