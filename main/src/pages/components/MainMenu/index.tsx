
import './index.less'
import MenuItem from './components/MenuItem';
import config from './config';

interface IProps{
  activeKey:number
  onChange:(key:number)=>void
  countResult:Record<string,number>
}

export default function MainMenu(props:IProps) {
  // console.log(config)
  const {onChange,activeKey,countResult}=props



  return (
    <div className='main-menu'>
      <div className='logo'>
        {/* <img src="../../../resource/logo1.png" alt="" /> */}
      </div>
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
