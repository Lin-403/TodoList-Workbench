import { api } from '@/api';
import apiConfig from '@/api/config';
import CardContainer from '@/components/CardContainer';
import { API_RESULT } from '@/const';
import { Statistic } from 'antd';
import * as ec from 'echarts';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getConfig } from './config';

import './index.less';

interface IProps {}

export default function TaskStatistics(props: IProps) {
  const [allData, setAllData] = useState<{ doing: any[]; done: any[] }>();

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

  return (
    <div className="card-containers">
      <CardContainer title="任务完成比" theme="green">
        <div id="task-chart" className="chart-container"></div>
      </CardContainer>

      <CardContainer title="任务完成量" theme="green" height={140}>
        <div style={{ margin: '0px auto 0px 10px' }}>
          <Statistic title="今日剩余任务量" value={todaysRemain} />
        </div>
      </CardContainer>
      <CardContainer title="任务完成量" theme="green" height={140}>
        <div style={{ margin: '0px auto 0px 10px' }}>
          <Statistic title="今日已完成任务量" value={todaysFinished} />
        </div>
      </CardContainer>
      <CardContainer title="任务完成量" theme="blue" height={140}>
        <div style={{ margin: '0px auto 0px 10px' }}>
          <Statistic title="累计已完成任务量" value={allFinished} />
        </div>
      </CardContainer>
    </div>
  );
}
