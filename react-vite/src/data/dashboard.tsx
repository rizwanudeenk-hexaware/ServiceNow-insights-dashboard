import {
  AnalyticKPIData,
} from 'types/dashboard';

export const analyticKPIs: AnalyticKPIData[] = [
  {
    title: 'Total Open Incidents',
    value: '...',
    icon: {
      name: 'material-symbols:attribution-outline-rounded',
      color: 'primary',
    },
  },
  {
    title: 'Unassigned Tickets',
    value: '...',
    icon: {
      name: 'material-symbols:call-missed-outgoing-rounded',
      color: 'warning',
    },
  },
  {
    title: 'Stale Tickets (>30d)',
    value: '...',
    icon: {
      name: 'material-symbols:credit-score-outline-rounded',
      color: 'success',
    },
  },
];