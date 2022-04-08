export const getConfig = (data: { name: string; value: number }[]) => {
    const option = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '任务完成比',
          type: 'pie',
          radius: ['30%', '55%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '10',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: data,
        },
      ],
    };
    return option;
  };
  