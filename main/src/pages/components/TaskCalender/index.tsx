
import './index.less'

import { useEffect, useRef, useState } from 'react';

import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { getApi } from '@/api';
import apiConfig from '@/api/config';
import { TaskT } from '../TaskList';
import { API_RESULT, MENU_KEY } from '@/const';
import moment from 'moment';
import { Button } from 'antd';

interface IProps {

}

export default function TaskCalendar(props: IProps) {

    const calendarRef = useRef<any>()
    const [tasks, setTasks] = useState<TaskT[]>([])

    //获取json数据
    const getLatestList = () => {
        getApi(apiConfig.list.url, {
            type: MENU_KEY.DOING
        }).then(res => {
            if (res.code === API_RESULT.SUCCESS) {

                const latestTasks = res.data.map((i: TaskT) => {
                    // const momentDDL=moment(i.endTime)
                    return Object.assign(i, {
                        endTime: moment(i.endTime),
                        startTime: moment(i.startTime)
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
    useEffect(() => {
        const calendar = new Calendar('#calendar', {
            defaultView: 'month',
            taskView: true,
            // template: {
            //   monthDayname: function(dayname) {
            //     return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
            //   }
            // }
            // useCreationPopup: true,
            disableClick:true,
            useDetailPopup: true,
        });
        calendarRef.current = calendar
        getLatestList()
        return ()=>{
            const dom=document.querySelector('#calendar')
            if(dom){
                dom.innerHTML=''
            }
        }
    }, [])

    useEffect(() => {
        if (calendarRef.current) {
            const schedules = tasks.map(i => ({
                id: i.taskID,
                calendarId: i.taskID,
                title: i.title,
                category: 'time',
                dueDateClass: '',
                // start: '2022-04-18T17:30:00+09:00',
                // end: '2022-04-19T17:31:00+09:00',
                start: i.startTime.toISOString().split('.')[0]+'Z',
                end: i.endTime.toISOString().split('.')[0]+'Z',
                bgColor: '#2261e4',
                color:'white',
                borderColor:'#204df8',
                isReadOnly: true    // schedule is read-only
            }))
            calendarRef.current.clear()
            calendarRef.current.createSchedules(schedules)
        }
    }, [tasks])

    const pageChange=(flag: 1|-1|0)=>{
        if(flag===1){
            calendarRef.current?.next()
        }
        else if(flag==-1){
            calendarRef.current?.prev()
        }
        else {
            calendarRef.current?.today()
        }
    }

    return (
        <div className='task-calendar_container'>
            <div className="task-calendar_btns">
                
                <Button onClick={()=>pageChange(-1)} size="small">PreMonth</Button>
                <Button onClick={()=>pageChange(0)} size="small">Today</Button>
                <Button onClick={()=>pageChange(1)} size="small">NextMonth</Button>

            </div>
            <div id="calendar"></div>
        </div>
    );
}
