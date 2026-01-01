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
