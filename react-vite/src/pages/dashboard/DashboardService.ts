import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/metrics';

export const getWidgetMapping = async () => {
  try {
    const response = await axios.get('http://localhost:3000/widgets');
    return response.data;
  } catch (error) {
    console.error('Error fetching widget mapping', error);
    throw error;
  }
};

export const getOpenIncidentsCount = async (widgetId: string) => {
  try{
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data.stats.count;
  } catch (error){
    console.error('Error fetching open incidents count', error);
    throw error;
  }
}

export const getUnassignedTicketsCount = async (widgetId: string) => {
  try{
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data.stats.count;
  } catch (error){
    console.error('Error fetching unassigned tickets count', error);
    throw error;
  }
}

export const getStaleTicketsCount = async (widgetId: string) => {
  try{
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data.stats.count;
  } catch (error){
    console.error('Error fetching stale tickets count', error);
    throw error;
  }
}

export const getVolumeByPriority = async (widgetId: string) => {
  try{
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data;
  } catch (error){
    console.error('Error fetching volume by priority', error);
    throw error;
  }
}

export const getCriticalBacklog = async (widgetId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching critical backlog', error);
    throw error;
  }
};

export const getCategoryDistribution = async (widgetId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category distribution', error);
    throw error;
  }
};

export const getGroupWorkload = async (widgetId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching group workload', error);
    throw error;
  }
};

export const getSlaBreachStatus = async (widgetId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SLA breach status', error);
    throw error;
  }
};

export const getStateFunnel = async (widgetId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching state funnel', error);
    throw error;
  }
};

export const getTopMonthlyCallers = async (widgetId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${widgetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top monthly callers', error);
    throw error;
  }
};
