

import { api } from '@/api';
import apiConfig from '@/api/config';
import CardContainer from '@/components/CardContainer';
import { API_RESULT } from '@/const';

import * as ec from 'echarts';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getConfig } from './config';
// @ts-nocheck  
import GridLayout from "react-grid-layout";

import moment from 'moment';

import { Statistic } from 'antd';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './index.less';
import { getLocal, saveLocal } from '@/utils';

interface IProps { }

const DEFAULT_LAYOUT= [
  { i: "todaysRemain", x: 0, y: 0, w: 2.5, h: 3,minW: 2, minH: 2.5 },
  { i: "todaysFinished", x: 1, y: 0, w: 2.5, h: 3,minW: 2, minH: 2.5 },
  { i: "allFinished", x: 2, y: 1, w: 2.5, h: 3,minW: 2, minH: 2.5 },
  { i: "finishedRadio", x: 4, y: 0, w: 2.5, h: 6, minW: 2, minH: 6 },

];

const LAYOUT_LOCAL_KEY='todo-layout'

export default function TaskStatistics(props: IProps) {
  const [allData, setAllData] = useState<{ doing: any[]; done: any[] }>();
  const [layout,setLayout]=useState<GridLayout.Layout[]>(getLocal(LAYOUT_LOCAL_KEY,DEFAULT_LAYOUT))

  const chartRef = useRef<ec.EChartsType>();

  useEffect(() => {
    api(apiConfig.all.url).then((res) => {
      if (res.code === API_RESULT.SUCCESS) {
        setAllData(res.data);
        console.log(res.data, 'all');
      }
    });
  }, []);

  const todaysRemain = useMemo(() => {
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
    const dom = document.getElementById('task-chart');
    if (dom) {
      const myChart = ec.init(dom);
      chartRef.current = myChart;
    }
  }, []);

  useEffect(() => {
    if (chartRef.current && allData) {
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
      chartRef.current.setOption(option);
    }
  }, [allData]);


  const handleLayoutChange=(l: GridLayout.Layout[])=>{
    saveLocal(LAYOUT_LOCAL_KEY,l)
  }

  const renderCards=()=>{
    const cards=[
      {
        theme:'blue',
        title:'任务完成比',
        key:"finishedRadio",
        content:()=>(
          <div id="task-chart" className="chart-container"></div>
        ),
      },
      {
        theme:'green',
        title:'任务完成量',
        key:"todaysRemain",
        content:()=>(
          <div style={{ margin: '0px auto 0px 10px' }}>
          <Statistic title="今日剩余任务量" value={todaysRemain} />
          </div>
        ),
      },
      {
        theme:'pinkBlueGreen',
        title:'任务完成量',
        key:"todaysFinished",
        content:()=>(
          <div style={{ margin: '0px auto 0px 10px' }}>
            <Statistic title="今日已完成任务量" value={todaysFinished} />
          </div>
        ),
      },
      {
        theme:'bluePink',
        title:'任务完成量',
        key:"allFinished",
        content:()=>(
          <div style={{ margin: '0px auto 0px 10px' }}>
          <Statistic title="累计已完成任务量" value={allFinished} />
        </div>
        ),
      },
    ]
    return cards.map(i=>(
      <div key={i.key} className={`card-container card-theme_${i.theme}`}>
      <div className='card-container_title'>{i.title}</div>
        {i.content()}
      </div>
    ))
  }
  return (
    <div className="card-containers">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1100}
        onLayoutChange={handleLayoutChange}
      >
        {renderCards()}
      </GridLayout>

    </div>
  );
}
