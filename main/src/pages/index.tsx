import { MENU_KEY } from '@/const';
import { useState } from 'react';
import MainMenu from './components/MainMenu';
import TaskList from './components/TaskList';
import './index.less'

export default function IndexPage() {
  const [tab,setTab]=useState(MENU_KEY.DOING)
  const [updateFlag,update]=useState(0)
  return (
    <div className='page container'>
     <MainMenu activeKey={tab} onChange={setTab} updateFlag={updateFlag}/>
     <TaskList activeKey={tab} onCountChange={()=>update((pre)=>pre+1)}/>
    </div>
  );
}


