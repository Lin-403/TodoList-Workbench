export const getConfig = (data: { name: string; value: number }[]) => {
    const option = {
      color:['#FBBCED','#959AE2','#BCFCFB','#FF7489','#9DFEAF'],
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '任务完成比',
          type: 'pie',
          radius: ['40%', '75%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
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
  