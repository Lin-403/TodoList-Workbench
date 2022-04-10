import { api } from '@/api';
import apiConfig from '@/api/config';
import { MENU_KEY } from '@/const';
import { getLocal, saveLocal } from '@/utils';
import { useEffect, useState } from 'react';
import MainMenu from './components/MainMenu';
import Settings from './components/Settings';
import TaskCalendar from './components/TaskCalender';
import TaskList from './components/TaskList';
import TaskStatistics from './components/TaskStatistics';
import './index.less'

const DEFAULT_SETTINGS={
  mainColor:'#9599E2',
  mainActiveColor:'#8BC6EC',
  radius:'6px',
}

const SETTINGS_LOCAL_KEY="todo-settings"

export default function IndexPage() {
  const [tab, setTab] = useState(MENU_KEY.STATISTICS)
  const [updateFlag, update] = useState(0)

  const [countResult,setCountResult]=useState<Record<string,number>>({
    doing:0,
    done:0
  })

  const [settings,setSettings]=useState(getLocal(SETTINGS_LOCAL_KEY,DEFAULT_SETTINGS))
    
    useEffect(() => {
        Object.entries(settings).forEach(e=>{
            const [key,value]=e;
            document.documentElement.style.setProperty(`--${key}`,String(value))
        })
        saveLocal(SETTINGS_LOCAL_KEY,settings)
    }, [settings])

  useEffect(() => {
   getCount()
  }, [updateFlag])

  const getCount=()=>{
    api(apiConfig.count.url).then(res=>{
      setCountResult(res.data)
    })
  }


  return (
    <div className='page container'>
      <MainMenu activeKey={tab} onChange={setTab} countResult={countResult} />
      <div className="right-container">
        {
          [MENU_KEY.DOING, MENU_KEY.DONE].includes(tab) && (
            <TaskList activeKey={tab} onCountChange={() => update((pre) => pre + 1)} />
          )
        }
        {tab === MENU_KEY.CALENDAR && <TaskCalendar />}
        {tab === MENU_KEY.STATISTICS && <TaskStatistics/>}
        {tab === MENU_KEY.SETTINGS && <Settings onSubmit={(s)=>{
          setSettings(s)
          update((pre) => pre + 1)
        }}  settings={settings}/>}

      </div>

    </div>
  );
}




