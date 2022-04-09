import { api } from '@/api';
import apiConfig from '@/api/config';
import { MENU_KEY } from '@/const';
import { useEffect, useState } from 'react';
import MainMenu from './components/MainMenu';
import TaskCalendar from './components/TaskCalender';
import TaskList from './components/TaskList';
import TaskToolBar from './components/TaskToolBar';
import TaskStatistics from './components/TaskStatistics';
import './index.less'
import { getLocal, saveLocal } from '@/utils';

const SORT_LOCAL_KEY='todo-sort'

export default function IndexPage() {
  const [tab, setTab] = useState(MENU_KEY.STATISTICS)
  const [updateFlag, update] = useState(0)
  const [sort,setSort]=useState(getLocal(SORT_LOCAL_KEY,'sort-start'))

  const [countResult,setCountResult]=useState<Record<string,number>>({
    doing:0,
    done:0
  })

  useEffect(() => {
   getCount()
  }, [updateFlag])

  const getCount=()=>{
    api(apiConfig.count.url).then(res=>{
      setCountResult(res.data)
    })
  }
  const handleToolMethod=(key:string)=>{
     if([MENU_KEY.DOING, MENU_KEY.DONE].includes(tab)){
       if(key.includes('sort')){
         setSort(key)
         saveLocal(SORT_LOCAL_KEY,key)
       }
     }
  }

  return (
    <div className='page container'>
      <MainMenu activeKey={tab} onChange={setTab} countResult={countResult} />
      <div className="right-container">
        <TaskToolBar tab={tab} onClick={handleToolMethod}/>
        {
          [MENU_KEY.DOING, MENU_KEY.DONE].includes(tab) && (
            <TaskList sort={sort} activeKey={tab} onCountChange={() => update((pre) => pre + 1)} />
          )
        }
        {tab === MENU_KEY.CALENDAR && <TaskCalendar />}
        {tab === MENU_KEY.STATISTICS && <TaskStatistics/>}

      </div>

    </div>
  );
}




