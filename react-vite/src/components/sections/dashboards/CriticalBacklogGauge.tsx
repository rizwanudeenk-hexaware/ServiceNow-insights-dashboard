import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ReactEchart from 'components/base/ReactEchart';
import { EChartsOption } from 'echarts-for-react';
import * as echarts from 'echarts'; 

interface CriticalBacklogData {
  stats: {
    count: string;
  }
}

interface CriticalBacklogGaugeProps {
  data: CriticalBacklogData;
}

const CriticalBacklogGauge = ({ data }: CriticalBacklogGaugeProps) => {
  const count = data?.stats?.count ? parseInt(data.stats.count) : 0;

  const option: EChartsOption = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 200,
        splitNumber: 10,
        itemStyle: {
          color: '#FFAB91'
        },
        progress: {
          show: true,
          width: 30
        },
        pointer: {
          show: true
        },
        axisLine: {
          lineStyle: {
            width: 30
          }
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: -20,
          color: '#999',
          fontSize: 20
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, 40],
          fontSize: 30,
          fontWeight: 'bolder',
          formatter: '{value}',
          color: 'inherit'
        },
        data: [
          {
            value: count
          }
        ]
      },
    ]
  };

  return (
    <Card>
      <CardHeader title="Critical Backlog" subheader="Number of critical incidents" />
      <Box sx={{ p: 2, pb: 1 }}>
        <ReactEchart echarts={echarts} option={option} sx={{ height: 350 }} />
      </Box>
    </Card>
  );
};

export default CriticalBacklogGauge;