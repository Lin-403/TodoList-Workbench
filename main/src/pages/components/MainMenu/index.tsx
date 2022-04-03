
import './index.less'
import MenuItem from './components/MenuItem';
import config from './config';
import { useState } from 'react';

export default function MainMenu() {
  // console.log(config)
  const [activeKey,setActiveKey]=useState('doing')
  return (
    <div className='main-menu'>
      <div className='main-menu_content'>
      {
        
        config.map((i)=>{
         return (<MenuItem
          name={i.name}
          key={i.key}
          active={activeKey === i.key}
          count={i.count} 
          icon={i.icon}
          onClick={() => setActiveKey(i.key)} 
          />)

        })
      }
      </div>
    </div>
  );
}
