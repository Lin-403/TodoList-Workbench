
import './index.less'
import MenuItem from './components/MenuItem';
import config from './config';
import { useEffect, useState } from 'react';
import apiConfig from '@/api/config';
import { api } from '@/api';

interface IProps{
  activeKey:number
  onChange:(key:number)=>void
  updateFlag:number
}

export default function MainMenu(props:IProps) {
  // console.log(config)
  const {onChange,activeKey,updateFlag}=props
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

  return (
    <div className='main-menu'>
      <div className='main-menu_content'>
      {
        
        config.map((i)=>{
         return (<MenuItem
          name={i.name}
          key={i.key}
          active={activeKey === i.key}
          count={countResult[i.apiKey]} 
          icon={i.icon}
          onClick={() =>onChange(i.key)} 
          />)

        })
      }
      </div>
    </div>
  );
}
