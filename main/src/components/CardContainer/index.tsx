import './index.less'

interface IProps {
    width?: number
    height?: number
    title?: string
    theme?:'default'|'blue'|'green'|'bluePink'|'pinkBlueGreen'
    children:JSX.Element
}

export default function CardContainer(props: IProps) {
    const {children, width = 280, height = 200, title ,theme='default'} = props
    return (
        <div className={`card-container card-theme_${theme}`} style={{height:height+'px',width:width+'px'}}>
            <div className='card-container_title'>{title}</div>
            {children}
        </div>
    )
}