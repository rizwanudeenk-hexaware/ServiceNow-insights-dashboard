import ReactEchart from 'components/base/ReactEchart';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';

interface SlaBreachStatusData {
  stats: { count: string };
  groupby_fields: { field: string; value: string; display_value: string }[];
}

interface SlaBreachStatusDonutChartProps {
  data: SlaBreachStatusData[];
}

const SlaBreachStatusDonutChart: React.FC<SlaBreachStatusDonutChartProps> = ({ data }) => {
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
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left', data: chartData.map(item => item.name) },
      series: [{
        name: 'SLA Breach Status',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: chartData,
      }],
    } as EChartsOption;
  }, [chartData, theme]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="SLA Breach Status" />
      <CardContent sx={{ height: '80%' }}>
        <ReactEchart echarts={echarts} option={chartOptions} sx={{ height: '100%' }} />
      </CardContent>
    </Card>
  );
};

export default SlaBreachStatusDonutChart;
