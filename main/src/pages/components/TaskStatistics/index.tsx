

import { api } from '@/api';
import apiConfig from '@/api/config';
import { API_RESULT } from '@/const';

import * as ec from 'echarts';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getConfig, getGaugeConfig } from './config';
// @ts-nocheck  
import GridLayout from "react-grid-layout";

import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';


import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './index.less';
import { getLocal, saveLocal } from '@/utils';
import { Button, Checkbox, Dropdown, Menu, Popover } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { FilterIcon } from '@/components/Icon';

interface IProps { }

const DEFAULT_LAYOUT = [
  { i: "allRemain", x: 2, y: 1, w: 4, h: 3, minW: 4, minH: 3 },
  { i: "todaysRemain", x: 0, y: 0, w: 4, h: 3, minW: 4, minH: 3 },
  { i: "todaysFinished", x: 1, y: 0, w: 4, h: 3, minW: 4, minH: 3 },
  { i: "allFinished", x: 2, y: 1, w: 4, h: 3, minW: 4, minH: 3 },
  { i: "outdatedCount", x: 3, y: 1, w: 4, h: 3, minW: 4, minH: 3 },

  { i: "finishedRadio", x: 4, y: 0, w: 5, h: 6, minW: 4, minH: 6 },
  { i: "finishedProgress", x: 4, y: 0, w: 6, h: 7, minW: 6, minH: 7 },

];

const DEFAULT_CARDS = [
  { i: "allRemain", title: '总剩余任务量' },
  { i: "todaysRemain", title: '今日截止任务量' },
  { i: "todaysFinished", title: '今日已完成任务量' },
  { i: "allFinished", title: '累计已完成任务量' },
  { i: "outdatedCount", title: '已截止任务量' },

  { i: "finishedRadio", title: '任务完成比' },
  { i: "finishedProgress", title: '任务完成进度' },

];



const LAYOUT_LOCAL_KEY = 'todo-layout'
const CARDS_LOCAL_KEY = 'todo-cards'
// const DEFAULT_CARD_KEYS = DEFAULT_LAYOUT.map(i => i.i)

export default function TaskStatistics(props: IProps) {
  const [allData, setAllData] = useState<{ doing: any[]; done: any[] }>();
  const [layout, setLayout] = useState<GridLayout.Layout[]>(
    getLocal(LAYOUT_LOCAL_KEY, DEFAULT_LAYOUT)
  )
  const [visibleCards, setVisibleCards] = useState<string[]>(
    getLocal(CARDS_LOCAL_KEY, DEFAULT_CARDS),
  );

  console.log(visibleCards,'1111')

  const chartRefs = useRef<Record<string, ec.EChartsType>>({});

  useEffect(() => {
    api(apiConfig.all.url).then((res) => {
      if (res.code === API_RESULT.SUCCESS) {
        setAllData(res.data);
        console.log(res.data, 'all');
      }
    });
  }, []);

  const todaysRemain = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return allData?.doing.filter((i) =>
      moment(i.endTime.split('T')[0]).isSame(moment(today)),
    ).length;
  }, [allData]);

  const outdatedCount = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return allData?.doing.filter((i) =>
      moment(i.endTime.split('T')[0]).isBefore(moment(today)),
    ).length;
  }, [allData]);

  const allRemain = useMemo(() => {
    return allData?.doing.length;
  }, [allData]);

  const todaysFinished = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return allData?.done.filter((i) =>
      moment(i.finishTime.split('T')[0]).isSame(moment(today)),
    ).length;
  }, [allData]);

  const allFinished = useMemo(() => {
    return allData?.done.length;
  }, [allData]);

  useEffect(() => {
    const ids = ['task-chart', 'task-guage-chart']
    ids.forEach(i => {
      const dom = document.getElementById(i)
      if (dom && chartRefs.current) {
        const chart = ec.init(dom);
        chartRefs.current[i] = chart
      }
    })
  }, []);

  useEffect(() => {
    if (allData) {
      if (chartRefs.current?.['task-chart']) {
        const chartObj = chartRefs.current['task-chart']
        const dataSource = [
          {
            name: '进行中',
            value: allData.doing.length,
          },
          {
            name: '已完成',
            value: allData.done.length,
          },
        ];
        const option = getConfig(dataSource);
        chartObj.setOption(option);
      }
      if (chartRefs.current?.['task-guage-chart'] && todaysRemain !== undefined && todaysFinished !== undefined) {
        const chartObj = chartRefs.current['task-guage-chart']
        const prop = todaysFinished / (todaysRemain + todaysFinished) * 100
        const option = getGaugeConfig(isNaN(prop) ? 0 : prop);
        chartObj.setOption(option);
      }
    }

  }, [allData]);
  const handleLayoutChange = (l: GridLayout.Layout[]) => {
    Object.values(chartRefs.current).forEach(c=>{
      c.resize()
    })
    saveLocal(LAYOUT_LOCAL_KEY, l)
  }
  const handleCardsChange = (checkedValue: any[]) => {
    setVisibleCards(checkedValue);
    saveLocal(CARDS_LOCAL_KEY, checkedValue);
    console.log(checkedValue,'155')
  };

  // const menu = (
  //   <Checkbox.Group 
  //   options={DEFAULT_CARDS.map(i=>({value:i.i,label:i.title}))} 
  //   value={visibleCards} 
  //   style={{display:'flex',flexDirection:'column'}}
  //   onChange={handleCardsChange}>

  //   </Checkbox.Group>
  // );
  
  const menu = (
    <Checkbox.Group 
      onChange={handleCardsChange}
      
      options={DEFAULT_CARDS.map((i) => ({ value: i.i, label: i.title }))}
      value={visibleCards}
      style={{ display: 'flex', flexDirection: 'column' }}
    ></Checkbox.Group>
  );  


  const renderCards = () => {
    const cards = [
      {
        theme: 'blue',
        title: '任务完成比',
        key: "finishedRadio",
        content: () => (
          <div id="task-chart" className="chart-container"></div>
        ),
      },
      {
        theme: 'yibiaopan',
        title: '任务完成进度',
        key: "finishedProgress",
        content: () => (
          <div id="task-guage-chart" className="chart-container"></div>
        ),
      },
      {
        theme: 'green',
        title: '今日截止任务量',
        key: "todaysRemain",
        content: () => (
          <div className='statistic-card'>
            {todaysRemain}
            {/* <Statistic title="今日截止任务量" value={todaysRemain} /> */}
          </div>
        ),
      },
      {
        theme: 'yijiezhi',
        title: '已截止任务量',
        key: "outdatedCount",
        content: () => (
          <div className='statistic-card'>
            {outdatedCount}
            {/* <Statistic title="今日截止任务量" value={todaysRemain} /> */}
          </div>
        ),
      },
      {
        theme: 'pinkBlue',
        title: '总剩余任务量',
        key: "allRemain",
        content: () => (
          <div className='statistic-card'>
            {allRemain}
            {/* <Statistic title="总剩余任务量" value={allRemain} /> */}
          </div>
        ),
      },
      {
        theme: 'pinkBlueGreen',
        title: '今日已完成任务量',
        key: "todaysFinished",
        content: () => (
          <div className='statistic-card'>
            {todaysFinished}
            {/* <Statistic title="今日已完成任务量" value={todaysFinished} /> */}
          </div>
        ),
      },
      {
        theme: 'bluePink',
        title: '累计已完成任务量',
        key: "allFinished",
        content: () => (
          <div className='statistic-card'>
            {allFinished}
            {/* <Statistic title="累计已完成任务量" value={allFinished} /> */}
          </div>
        ),
      },
    ]
    // visibleCards=['allRemain', 'todaysRemain', 'todaysFinished', 'allFinished', 'outdatedCount', 'finishedRadio', 'finishedProgress']
    return cards.map((i) => (
      <div
        className={`card-container card-theme_${i.theme} ${
          visibleCards.includes(i.key) ? '' : 'card-container_hidden'
        }`}
        key={i.key}
      >
        <div className="card-container_title">{i.title}</div>
        {i.content()}
      </div>
    ));
  }
  return (
    <div className="card-containers">
      <div className='card-tool-bar'>
        <Popover placement="topLeft" content={menu} title="可见卡片配置" trigger="click" >
          <div className='filter-icon'><FilterIcon/></div>
        </Popover>
      </div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={22}
        rowHeight={30}
        width={1100}
        onLayoutChange={handleLayoutChange}
      >
        {renderCards()}
      </GridLayout>
    </div>
  );
}
