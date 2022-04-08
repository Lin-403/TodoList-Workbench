import { DatePicker, Tag } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { quickTimeConfig } from '../../config';
import './index.less';

interface IProps {
  value?: moment.Moment;
  onChange?: (v: moment.Moment) => void;
}

export default function QuickDatePicker(props: IProps) {
  const { value, onChange } = props;

  const handleQuickCreate = (offset: number) => {
    const d = new Date();
    const time = d.toISOString().split('T')[0] + 'T10:00:00.000Z';
    let momentTime = moment(time).add(offset, 'd'); // .format('Y-M-D HH:mm:ss')
    onChange?.(momentTime);
  };

  return (
    <div className="time-tags">
      <DatePicker
        showTime
        onOk={onChange}
        placeholder="选择任务截止日期"
        value={value}
        size="small"
      />
      {quickTimeConfig.map((i) => (
        <Tag
          key={i.offset}
          color={i.color}
          onClick={() => {
            handleQuickCreate(i.offset);
          }}
        >
          {i.title}
        </Tag>
      ))}
    </div>
  );
}
