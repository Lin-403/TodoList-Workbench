
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
    const [view, setView] = useState('month')
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
            defaultView: view,
            taskView: true,
            disableClick: true,
            useDetailPopup: true,
        });
        calendarRef.current = calendar
        getLatestList()
        return () => {
            const dom = document.querySelector('#calendar')
            if (dom) {
                dom.innerHTML = ''
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
                start: i.startTime.toISOString().split('.')[0] + 'Z',
                end: i.endTime.toISOString().split('.')[0] + 'Z',
                bgColor: '#8BC6EC',
                color: 'white',
                borderColor: '#31A0E7',
                isReadOnly: true    // schedule is read-only
            }))
            calendarRef.current.clear()
            calendarRef.current.createSchedules(schedules)
        }
    }, [tasks])

    const pageChange = (flag: 1 | -1 | 0) => {
        if (flag === 1) {
            calendarRef.current?.next()
        }
        else if (flag == -1) {
            calendarRef.current?.prev()
        }
        else {
            calendarRef.current?.today()
        }
    }

    const viewChange = (v: string) => {
        setView(v)
        calendarRef.current.changeView(v)
    }

    return (
        <div className='task-calendar_container'>
            <div className='task-calendar_tools'>
                <div className="task-calendar_btns">
                    <Button onClick={() => pageChange(-1)} size="small">Pre</Button>
                    <Button onClick={() => pageChange(0)} size="small">Today</Button>
                    <Button onClick={() => pageChange(1)} size="small">Next</Button>
                </div>

                <div className="task-calendar_btns">
                    <Button onClick={() => viewChange('month')} size="small" disabled={view==='month'}>Month</Button>
                    <Button onClick={() => viewChange('week')} size="small" disabled={view==='week'}>Week</Button>
                    <Button onClick={() => viewChange('day')} size="small" disabled={view==='day'}>Day</Button>
                </div>
            </div>
            <div id="calendar"></div>
        </div>
    );
}
