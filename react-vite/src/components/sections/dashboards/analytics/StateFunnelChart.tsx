import ReactEchart from 'components/base/ReactEchart';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';

interface StateFunnelData {
  stats: { count: string };
  groupby_fields: { field: string; value: string; display_value: string }[];
}

interface StateFunnelChartProps {
  data: StateFunnelData[];
}

const StateFunnelChart: React.FC<StateFunnelChartProps> = ({ data }) => {
  const theme = useTheme();

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map((item) => ({
      name: item.groupby_fields[0].display_value,
      value: parseInt(item.stats.count, 10),
    }));
  }, [data]);

  const chartOptions: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
        data: chartData.map(item => item.name)
      },
      series: [
        {
          name: 'State Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: chartData
        }
      ]
    } as EChartsOption;
  }, [chartData, theme]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="State Funnel" />
      <CardContent sx={{ height: '80%' }}>
        <ReactEchart echarts={echarts} option={chartOptions} sx={{ height: '100%' }} />
      </CardContent>
    </Card>
  );
};

export default StateFunnelChart;
