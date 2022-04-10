import { CalendarIcon, ChartIcon, DoingIcon, DoneIcon, SettingsIcon } from "@/components/Icon"
import { MENU_KEY } from "@/const"

const config=[
    {
        name:'统计',
        key:MENU_KEY.STATISTICS,
        apiKey:'',
        icon:(active:boolean)=><ChartIcon active={active}/>
    },
    {
        name:'日历',
        key:MENU_KEY.CALENDAR,
        apiKey:'',
        icon:(active:boolean)=><CalendarIcon active={active}/>
    },
    {
        name:'进行中',
        key:MENU_KEY.DOING,
        apiKey:'doing',
        icon:(active:boolean)=><DoingIcon active={active}/>
    },
    {
        name:'已完成',
        key:MENU_KEY.DONE,
        apiKey:'done',
        icon:(active:boolean)=><DoneIcon active={active}/>
    },
    {
        name:'设置',
        key:MENU_KEY.SETTINGS,
        apiKey:'settings',
        icon:(active:boolean)=><SettingsIcon active={active}/>
    },
    
]

export default config