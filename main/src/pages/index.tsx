import { MENU_KEY } from '@/const';
import { useState } from 'react';
import MainMenu from './components/MainMenu';
import TaskCalendar from './components/TaskCalender';
import TaskList from './components/TaskList';
import TaskToolBar from './components/TaskList/components/TaskToolBar';
import './index.less'



export default function IndexPage() {
  const [tab, setTab] = useState(MENU_KEY.DOING)
  const [updateFlag, update] = useState(0)
  return (
    <div className='page container'>
      <MainMenu activeKey={tab} onChange={setTab} updateFlag={updateFlag} />
      <div style={{flex:1,background:'#EFEFEF'}}>
        <TaskToolBar />
        {
          [MENU_KEY.DOING, MENU_KEY.DONE].includes(tab) && (
            <TaskList activeKey={tab} onCountChange={() => update((pre) => pre + 1)} />
          )
        }
        {tab === MENU_KEY.CALENDAR && <TaskCalendar />}
      </div>

    </div>
  );
}


