import { DoingIcon, DoneIcon } from "@/components/Icon"
import { MENU_KEY } from "@/const"

const config=[
    {
        name:'进行中',
        key:MENU_KEY.DOING,
        apiKey:'doing',
        count:1,
        icon:()=><DoingIcon/>
    },
    {
        name:'已完成',
        key:MENU_KEY.DONE,
        apiKey:'done',
        count:8,
        icon:()=><DoneIcon/>
    }
]

export default config