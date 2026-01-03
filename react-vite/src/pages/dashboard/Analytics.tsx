import Grid from '@mui/material/Grid';
import {
  analyticKPIs,
  topCampaignsChartData,
  userByCountryData,
  userEngagementChartData,
} from 'data/dashboard';
import ProPlanCTA from 'components/sections/dashboards/analytics/cta/ProPlanCTA';
import AnalyticKPI from 'components/sections/dashboards/analytics/kpi/AnalyticKPI';
import TopCampaigns from 'components/sections/dashboards/analytics/top-campaigns/TopCampaigns';
import UserByCountry from 'components/sections/dashboards/analytics/user-by-country/UserByCountry';
import UserEngagement from 'components/sections/dashboards/analytics/user-engagement/UserEngagement';
import { useEffect, useState } from 'react';
import { getOpenIncidentsCount, getStaleTicketsCount, getUnassignedTicketsCount, getVolumeByPriority, getCriticalBacklog, getCategoryDistribution, getGroupWorkload, getSlaBreachStatus, getStateFunnel, getTopMonthlyCallers } from './DashboardService';
import VolumeByPriorityPieChart from 'components/sections/dashboards/analytics/VolumeByPriorityPieChart';
import CriticalBacklogGauge from 'components/sections/dashboards/analytics/CriticalBacklogGauge';
import CategoryDistributionBarChart from 'components/sections/dashboards/analytics/CategoryDistributionBarChart';
import GroupWorkloadBarChart from 'components/sections/dashboards/analytics/GroupWorkloadBarChart';
import SlaBreachStatusDonutChart from 'components/sections/dashboards/analytics/SlaBreachStatusDonutChart';
import StateFunnelChart from 'components/sections/dashboards/analytics/StateFunnelChart';
import TopCallersTable from 'components/sections/dashboards/analytics/TopCallersTable';

const Analytics = () => {
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

  useEffect(() => {
    getOpenIncidentsCount().then((count) => {
      setOpenIncidents(count);
    }).catch(error => {
      console.error("Failed to fetch unassigned tickets count:", error);
      setOpenIncidents('Error');
    });

    getUnassignedTicketsCount().then((count) => {
      setUnassignedTickets(count);
    }).catch(error => {
      console.error("Failed to fetch unassigned tickets count:", error);
      setUnassignedTickets('Error');
    });

    getStaleTicketsCount().then((count) => {
      setStaleTickets(count);
    }).catch(error => {
      console.error("Failed to fetch unassigned tickets count:", error);
      setStaleTickets('Error');
    });

    getVolumeByPriority().then((data) => {
      setVolumeByPriority(data);
    }).catch(error => {
      console.error("Failed to fetch volume by priority:", error);
    });

    getCriticalBacklog().then((data) => {
      setCriticalBacklog(data);
    }).catch(error => {
      console.error("Failed to fetch critical backlog:", error);
    });
    
    getCategoryDistribution().then((data) => {
      setCategoryDistribution(data);
    })
    .catch((error) => {
      console.error("Failed to fetch category distribution:", error);
    });

    getGroupWorkload().then((data) => {
      setGroupWorkload(data);
    })
    .catch((error) => {
      console.error("Failed to fetch group workload:", error);
    });

    getSlaBreachStatus().then((data) => {
      setSlaBreachStatus(data);
    })
    .catch((error) => {
      console.error("Failed to fetch sla breach status:", error);
    });

    getStateFunnel().then((data) => {
      setStateFunnel(data);
    })
    .catch((error) => {
      console.error("Failed to fetch state funnel:", error);
    });

    getTopMonthlyCallers().then((data) => {
      setTopMonthlyCallers(data);
    })
    .catch((error) => {
      console.error("Failed to fetch top monthly callers:", error);
    })
    .finally(() => {
      setLoadingTopCallers(false);
    });
    
  },[])

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

      <Grid size={{ xs: 12, lg: 5 }}>
        <TopCallersTable callers={topMonthlyCallers} loading={loadingTopCallers} />
      </Grid>

      <Grid size={{ xs: 12, lg: 7 }}>
        <UserEngagement data={userEngagementChartData} />
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        <TopCampaigns data={topCampaignsChartData} />
      </Grid>
      
      <Grid size={{ xs: 12, xl: 7 }}>
        <UserByCountry data={userByCountryData} />
      </Grid>
      <Grid size={12}>
        <ProPlanCTA />
      </Grid>
    </Grid>
  );
};

export default Analytics;
