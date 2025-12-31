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
import { getOpenIncidentsCount, getStaleTicketsCount, getUnassignedTicketsCount } from './DashboardService';

const Analytics = () => {
  const [openIncidents, setOpenIncidents] = useState('...');
  const [unassignedTickets, setUnassignedTickets] = useState('...');
  const [staleTickets, setStaleTickets] = useState ('...');

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
          <Grid key={kpi.title} size={{ xs: 6, md: 3, xl: 6 }}>
            <AnalyticKPI kpi={kpi} />
          </Grid>
        ))}
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
