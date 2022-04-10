
// export const ListIcon = () => (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="40" height="36" rx="3" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 14H44" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 24H36" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 32H36" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 24H14" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 32H14" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>)


interface IProps {
  active: boolean
}
// wm:#1971e4 wt:#2f7cff
// nm:#FFF nt:#2a7cff
export const CalendarIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01" /><rect x="4" y="8" width="40" height="36" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" /><path fillRule="evenodd" clipRule="evenodd" d="M28 20V34H36V20H28Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M17 4V12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M31 4V12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 20H20V34H12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 27H14" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>)
}

export const DoneIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' :  getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01" /><path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M17 24L22 29L32 19" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>)
}

export const DoingIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' :  getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01" /><path d="M19.4545 26.4444C17.6364 28.2222 15.8182 30 12.1818 30C8.54545 30 4 27.3333 4 22C4 16.6667 8.54545 14 12.1818 14C17.6364 14 20.3636 17.5556 24 22C27.6364 26.4444 30.3636 30 35.8182 30C39.4545 30 44 27.3333 44 22C44 16.6667 39.4545 14 35.8182 14C32.1818 14 29.4545 16.6667 28.5455 17.5556" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>)
}

export const ChartIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' :  getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 24C5 34.4934 13.5066 43 24 43V26C24 24.8954 24.8954 24 26 24H43C43 13.5066 34.4934 5 24 5C13.5066 5 5 13.5066 5 24Z" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><rect x="30" y="30" width="12" height="12" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>)
}


export const SortIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' :  getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01" /><path d="M19 6L19 42" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 17.8995L19 5.89949" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M29 42.1005L29 6.10051" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M29 42.1005L41 30.1005" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>)
}

export const PlusIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' :  getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01" /><path d="M24.0607 10L24.024 38" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 24L38 24" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>)
}

export const FilterIcon = () => {
  const color =  getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><g><rect fillOpacity="0.01" fill="#FFFFFF" x="0" y="0" width="48" height="48" strokeWidth="4" stroke="none" fillRule="evenodd" /><polygon stroke={color} strokeWidth="4" fill="none" fillRule="nonzero" strokeLinejoin="round" points="6 9 20.4 25.8177778 20.4 38.4444444 27.6 42 27.6 25.8177778 42 9" /></g></g></svg>)
}

export const SettingsIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' :  getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fillOpacity="0.01"/><path d="M18.2838 43.1712C14.9327 42.1735 11.9498 40.3212 9.58787 37.8669C10.469 36.8226 11 35.4733 11 34C11 30.6863 8.31371 28 5 28C4.79955 28 4.60139 28.0098 4.40599 28.029C4.13979 26.7276 4 25.3801 4 24C4 21.9094 4.32077 19.8937 4.91579 17.9994C4.94381 17.9998 4.97188 18 5 18C8.31371 18 11 15.3137 11 12C11 11.0487 10.7786 10.1491 10.3846 9.34999C12.6975 7.19937 15.5205 5.5899 18.6521 4.72302C19.6444 6.66807 21.6667 8.00001 24 8.00001C26.3333 8.00001 28.3556 6.66807 29.3479 4.72302C32.4795 5.5899 35.3025 7.19937 37.6154 9.34999C37.2214 10.1491 37 11.0487 37 12C37 15.3137 39.6863 18 43 18C43.0281 18 43.0562 17.9998 43.0842 17.9994C43.6792 19.8937 44 21.9094 44 24C44 25.3801 43.8602 26.7276 43.594 28.029C43.3986 28.0098 43.2005 28 43 28C39.6863 28 37 30.6863 37 34C37 35.4733 37.531 36.8226 38.4121 37.8669C36.0502 40.3212 33.0673 42.1735 29.7162 43.1712C28.9428 40.7518 26.676 39 24 39C21.324 39 19.0572 40.7518 18.2838 43.1712Z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round"/><path d="M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round"/></svg>)  
}
