import Grid from '@mui/material/Grid';
import {
  analyticKPIs,
} from 'data/dashboard';
import AnalyticKPI from 'components/sections/dashboards/analytics/kpi/AnalyticKPI';
import { useEffect, useState } from 'react';
import { getOpenIncidentsCount, getStaleTicketsCount, getUnassignedTicketsCount, getVolumeByPriority, getCriticalBacklog, getCategoryDistribution, getGroupWorkload, getSlaBreachStatus, getStateFunnel, getTopMonthlyCallers, getWidgetMapping } from './DashboardService';
import VolumeByPriorityPieChart from 'components/sections/dashboards/VolumeByPriorityPieChart';
import CriticalBacklogGauge from 'components/sections/dashboards/CriticalBacklogGauge';
import CategoryDistributionBarChart from 'components/sections/dashboards/CategoryDistributionBarChart';
import GroupWorkloadBarChart from 'components/sections/dashboards/GroupWorkloadBarChart';
import SlaBreachStatusDonutChart from 'components/sections/dashboards/SlaBreachStatusDonutChart';
import StateFunnelChart from 'components/sections/dashboards/StateFunnelChart';
import TopCallersTable from 'components/sections/dashboards/TopCallersTable';
import { useRefresh } from 'context/RefreshContext';

const Analytics = () => {
  const { refreshCount } = useRefresh();
  const [openIncidents, setOpenIncidents] = useState('...');
  const [unassignedTickets, setUnassignedTickets] = useState('...');
  const [staleTickets, setStaleTickets] = useState ('...');
  const [volumeByPriority, setVolumeByPriority] = useState([]);
  const [criticalBacklog, setCriticalBacklog] = useState(null);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [groupWorkload, setGroupWorkload] = useState([]);
  const [slaBreachStatus, setSlaBreachStatus] = useState([]);
  const [stateFunnel, setStateFunnel] = useState([]);
  const [topMonthlyCallers, setTopMonthlyCallers] = useState([]);
  const [loadingTopCallers, setLoadingTopCallers] = useState(true);
  const [widgetMapping, setWidgetMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    getWidgetMapping().then((data) => {
      setWidgetMapping(data);
    }).catch(error => {
      console.error("Failed to fetch widget mapping:", error);
    });
  }, [refreshCount]);

  useEffect(() => {
    if (Object.keys(widgetMapping).length === 0) return;

    getOpenIncidentsCount(widgetMapping['total_open_incidents']).then((count) => {
      setOpenIncidents(count);
    }).catch(error => {
      console.error("Failed to fetch unassigned tickets count:", error);
      setOpenIncidents('Error');
    });

    getUnassignedTicketsCount(widgetMapping['unassigned_tickets']).then((count) => {
      setUnassignedTickets(count);
    }).catch(error => {
      console.error("Failed to fetch unassigned tickets count:", error);
      setUnassignedTickets('Error');
    });

    getStaleTicketsCount(widgetMapping['stale_tickets']).then((count) => {
      setStaleTickets(count);
    }).catch(error => {
      console.error("Failed to fetch unassigned tickets count:", error);
      setStaleTickets('Error');
    });

    getVolumeByPriority(widgetMapping['volume_by_priority']).then((data) => {
      setVolumeByPriority(data);
    }).catch(error => {
      console.error("Failed to fetch volume by priority:", error);
    });

    getCriticalBacklog(widgetMapping['critical_backlog']).then((data) => {
      setCriticalBacklog(data);
    }).catch(error => {
      console.error("Failed to fetch critical backlog:", error);
    });
    
    getCategoryDistribution(widgetMapping['category_distribution']).then((data) => {
      setCategoryDistribution(data);
    })
    .catch((error) => {
      console.error("Failed to fetch category distribution:", error);
    });

    getGroupWorkload(widgetMapping['group_workload']).then((data) => {
      setGroupWorkload(data);
    })
    .catch((error) => {
      console.error("Failed to fetch group workload:", error);
    });

    getSlaBreachStatus(widgetMapping['sla_breach_status']).then((data) => {
      setSlaBreachStatus(data);
    })
    .catch((error) => {
      console.error("Failed to fetch sla breach status:", error);
    });

    getStateFunnel(widgetMapping['state_funnel']).then((data) => {
      setStateFunnel(data);
    })
    .catch((error) => {
      console.error("Failed to fetch state funnel:", error);
    });

    getTopMonthlyCallers(widgetMapping['top_monthly_callers']).then((data) => {
      setTopMonthlyCallers(data);
    })
    .catch((error) => {
      console.error("Failed to fetch top monthly callers:", error);
    })
    .finally(() => {
      setLoadingTopCallers(false);
    });
    
  },[widgetMapping, refreshCount])

  const kpisToDisplay = analyticKPIs.map(kpi => {
    if(kpi.title === 'Total Open Incidents'){
      return {...kpi, value: openIncidents};
    }

    if(kpi.title === 'Unassigned Tickets'){
      return {...kpi, value: unassignedTickets};
    }

    if(kpi.title === 'Stale Tickets (>30d)'){
      return {...kpi, value: staleTickets};
    }
    return kpi;
  });

  return (
    <Grid container>
      <Grid size={{ xs: 12, xl: 5 }} container>
        {kpisToDisplay.map((kpi) => (
          <Grid key={kpi.title} size={{ xs: 6, md: 4, xl: 6 }}>
            <AnalyticKPI kpi={kpi} />
          </Grid>
        ))}
      </Grid>

      <Grid size={{ xs: 12, lg: 7 }}>
        <VolumeByPriorityPieChart data={volumeByPriority} />
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        {criticalBacklog && <CriticalBacklogGauge data={criticalBacklog} />}
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <CategoryDistributionBarChart data={categoryDistribution} />
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <GroupWorkloadBarChart data={groupWorkload} />
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        <SlaBreachStatusDonutChart data={slaBreachStatus} />
      </Grid>

      <Grid size={{ xs: 12, lg: 7 }}>
        <StateFunnelChart data={stateFunnel} />
      </Grid>

      <Grid size={{ xs: 12, lg: 6 }}>
        <TopCallersTable callers={topMonthlyCallers} loading={loadingTopCallers} />
      </Grid>

    </Grid>
  );
};

export default Analytics;
