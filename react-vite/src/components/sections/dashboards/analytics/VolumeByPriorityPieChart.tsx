import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ReactEchart from 'components/base/ReactEchart';
import { EChartsOption } from 'echarts-for-react';
import * as echarts from 'echarts'; 

interface PriorityData {
  stats: { count: string; };
  groupby_fields: { field: string; value: string; display_value: string; }[];
}

interface VolumeByPriorityPieChartProps {
  data: PriorityData[];
}

const VolumeByPriorityPieChart = ({ data }: VolumeByPriorityPieChartProps) => {
  const chartData = data.map((item) => ({
    name: item.groupby_fields[0].display_value || `Priority ${item.groupby_fields[0].value}`,
    value: parseInt(item.stats.count),
  }));

  const option: EChartsOption = {
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
    legend: { orient: 'vertical', left: 'left', data: chartData.map(item => item.name) },
    series: [{
      name: 'Volume by Priority',
      type: 'pie',
      radius: '60%',
      center: ['50%', '60%'],
      minAngle: 10,
      data: chartData,
      emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
    }],
  };

  return (
    <Card>
      <CardHeader title="Volume by Priority" subheader="Distribution of incidents by priority" />     
      <Box sx={{ p: 2, pb: 1 }}>
        <ReactEchart echarts={echarts} option={option} sx={{ height: 350 }} />
      </Box>
    </Card>
  );
};

export default VolumeByPriorityPieChart;
