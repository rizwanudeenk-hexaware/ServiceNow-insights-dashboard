import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/metrics';

export const getOpenIncidentsCount = async () => {
  try{
    const response = await axios.get(`${baseUrl}/total-open-incidents`);
    return response.data.stats.count;
  } catch (error){
    console.error('Error fetching open incidents count', error);
    throw error;
  }
}

export const getUnassignedTicketsCount = async () => {
  try{
    const response = await axios.get(`${baseUrl}/unassigned-tickets`);
    return response.data.stats.count;
  } catch (error){
    console.error('Error fetching unassigned tickets count', error);
    throw error;
  }
}

export const getStaleTicketsCount = async () => {
  try{
    const response = await axios.get(`${baseUrl}/stale-tickets`);
    return response.data.stats.count;
  } catch (error){
    console.error('Error fetching stale tickets count', error);
    throw error;
  }
}

export const getVolumeByPriority = async () => {
  try{
    const response = await axios.get(`${baseUrl}/volume-by-priority`);
    return response.data;
  } catch (error){
    console.error('Error fetching volume by priority', error);
    throw error;
  }
}

export const getCriticalBacklog = async () => {
  try {
    const response = await axios.get(`${baseUrl}/critical-backlog`);
    return response.data;
  } catch (error) {
    console.error('Error fetching critical backlog', error);
    throw error;
  }
};

export const getCategoryDistribution = async () => {
  try {
    const response = await axios.get(`${baseUrl}/category-distribution`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category distribution', error);
    throw error;
  }
};

export const getGroupWorkload = async () => {
  try {
    const response = await axios.get(`${baseUrl}/group-workload`);
    return response.data;
  } catch (error) {
    console.error('Error fetching group workload', error);
    throw error;
  }
};

export const getSlaBreachStatus = async () => {
  try {
    const response = await axios.get(`${baseUrl}/sla-breach-status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SLA breach status', error);
    throw error;
  }
};

export const getStateFunnel = async () => {
  try {
    const response = await axios.get(`${baseUrl}/state-funnel`);
    return response.data;
  } catch (error) {
    console.error('Error fetching state funnel', error);
    throw error;
  }
};

export const getTopMonthlyCallers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/top-monthly-callers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top monthly callers', error);
    throw error;
  }
};
