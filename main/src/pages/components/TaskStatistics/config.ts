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
  
export const getGaugeConfig=(value:number)=>{
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        size:50,
        max: 100,
        splitNumber: 5,
        itemStyle: {
          color: '#FEBCED',
          shadowColor: '#FEBCED',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        progress: {
          show: true,
          roundCap: true,
          width: 12
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '58%',
          width: 6,
          offsetCenter: [0, '5%']
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 12
          }
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 1,
            color: '#fcfcfc'
          }
        },
        splitLine: {
          length: 7,
          lineStyle: {
            width: 2,
            color: '#fcfcfc'
          }
        },
        axisLabel: {
          distance: 18,
          color: '#fcfcfc',
          fontSize: 10
        },
        title: {
          show: false
        },
        detail: {
          width: '100%',
          lineHeight: 30,
          height: 40,
          borderRadius: 8,
          fontSize: 15,
          valueAnimation: true,
          color:'#fcfcfc',
          formatter: function (value:number) {
            return '任务进度 {value|' + value.toFixed(0) + '}{unit|%}';
          },
          rich: {
            value: {
              fontSize: 18,
              fontWeight: 'bolder',
              color: '#fcfcfc'
            },
            unit: {
              fontSize: 20,
              color: '#fcfcfc',
            }
          }
        },
        data: [
          {
            value,
          }
        ]
      }
    ]
  };
  return option;
}