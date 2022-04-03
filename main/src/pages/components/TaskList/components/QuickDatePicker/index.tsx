
import { DatePicker, Tag } from 'antd'
import moment from 'moment'
import { quickTimeConfig } from '../../config'
import './index.less'
//定义一个接口规范props的类型
interface IProps {
    value?: moment.Moment
    onChange?: (v: moment.Moment) => void
}

export default function QuickDatePicker(props: IProps) {
    const { value, onChange } = props

    const handleQuickCreate = (offset: number) => {
        const d = new Date()
        const time = d.toLocaleDateString().split('/').join(' ') + ' 18:00:00'
        let momentTime = moment(time).add(offset, 'd') //.format('Y-M-D HH:mm:ss');
        onChange?.(momentTime)
    }

    return (
        <div className='time-tags'>
            
            <DatePicker
                placeholder='选择任务截止日期'
                showTime onOk={onChange}
                value={value}
                size="small"
            />
            {
                quickTimeConfig.map(i => (
                    <Tag color={i.color}
                        key={i.offset}
                        onClick={() => {

                            handleQuickCreate(i.offset)
                        }}
                    >{i.title}</Tag>
                ))
            }
        </div>
    )
}