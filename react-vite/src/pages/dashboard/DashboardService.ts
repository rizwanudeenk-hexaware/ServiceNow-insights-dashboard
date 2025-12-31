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