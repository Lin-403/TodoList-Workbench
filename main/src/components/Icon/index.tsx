
// export const ListIcon = () => (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="40" height="36" rx="3" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 14H44" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 24H36" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 32H36" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 24H14" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 32H14" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>)


interface IProps {
  active: boolean
}
// wm:#1971e4 wt:#2f7cff
// nm:#FFF nt:#2a7cff
export const CalendarIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : '#8BC6EC'
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01"/><rect x="4" y="8" width="40" height="36" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round"/><path fillRule="evenodd" clipRule="evenodd" d="M28 20V34H36V20H28Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 4V12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M31 4V12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 20H20V34H12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 27H14" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
}

export const DoneIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : '#8BC6EC'
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01"/><path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 24L22 29L32 19" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
}

export const DoingIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : '#8BC6EC'
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01"/><path d="M19.4545 26.4444C17.6364 28.2222 15.8182 30 12.1818 30C8.54545 30 4 27.3333 4 22C4 16.6667 8.54545 14 12.1818 14C17.6364 14 20.3636 17.5556 24 22C27.6364 26.4444 30.3636 30 35.8182 30C39.4545 30 44 27.3333 44 22C44 16.6667 39.4545 14 35.8182 14C32.1818 14 29.4545 16.6667 28.5455 17.5556" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
}

export const ChartIcon = (props: IProps) => {
    const { active = false } = props
    const color = active ? '#FFF' : '#8BC6EC'
    return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 24C5 34.4934 13.5066 43 24 43V26C24 24.8954 24.8954 24 26 24H43C43 13.5066 34.4934 5 24 5C13.5066 5 5 13.5066 5 24Z" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><rect x="30" y="30" width="12" height="12" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>)
  }

  
  export const SortIcon = (props: IProps) => {
    const { active = false } = props
    const color = active ? '#FFF' : '#8BC6EC'
    return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01"/><path d="M19 6L19 42" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 17.8995L19 5.89949" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M29 42.1005L29 6.10051" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M29 42.1005L41 30.1005" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>)
  }

  export const PlusIcon = (props: IProps) =>{
    const { active = false } = props
    const color = active ? '#FFF' : '#8BC6EC'
     return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01"/><path d="M24.0607 10L24.024 38" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 24L38 24" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>)
  }
