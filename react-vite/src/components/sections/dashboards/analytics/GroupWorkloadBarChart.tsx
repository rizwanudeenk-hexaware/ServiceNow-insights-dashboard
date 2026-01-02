import ReactEchart from 'components/base/ReactEchart';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';

interface GroupWorkloadData {
  stats: { count: string };
  groupby_fields: { field: string; value: string; display_value: string }[];
}

interface GroupWorkloadBarChartProps {
  data: GroupWorkloadData[];
}

const GroupWorkloadBarChart: React.FC<GroupWorkloadBarChartProps> = ({ data }) => {
  const theme = useTheme();

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map((item) => ({
      group: item.groupby_fields[0].display_value,
      count: parseInt(item.stats.count, 10),
    }));
  }, [data]);

  const chartOptions: EChartsOption = useMemo(() => {
    const groups = chartData.map(item => item.group);
    const counts = chartData.map(item => item.count);

    return {
      grid: {
        show: true,
        left: '20%',
        right: '5%',
        bottom: '15%',
        top: '5%',
        containLabel: false
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          color: theme.palette.text.secondary,
        },
        splitLine: {
          lineStyle: {
            color: theme.palette.divider,
          },
        },
      },
      yAxis: {
        type: 'category',
        data: groups,
        axisLabel: {
          color: theme.palette.text.secondary,
        },
        axisLine: {
          lineStyle: {
            color: theme.palette.divider,
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: 'Group Workload',
          type: 'bar',
          data: counts,
          itemStyle: {
            color: theme.palette.primary.main,
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
    } as EChartsOption;
  }, [chartData, theme]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Group Workload" />
      <CardContent sx={{ height: '80%' }}>
        <ReactEchart echarts={echarts} option={chartOptions} sx={{ height: '100%' }} />
      </CardContent>
    </Card>
  );
};

export default GroupWorkloadBarChart;
