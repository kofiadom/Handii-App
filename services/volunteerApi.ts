import axios from 'axios';

// API URL from REACT_NATIVE_INTEGRATION.md
const API_URL = 'https://staging.codinnovations.com/voice-agent-api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Volunteer {
  id: number;
  name: string;
  age: number;
  location: string;
  phone?: string;
  email?: string;
  skills: string;
  available: boolean;
  years_experience: number;
  languages?: string;
  transportation?: string;
  background_check?: boolean;
  emergency_contact?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VolunteersResponse {
  volunteers: Volunteer[];
  total: number;
  limit: number;
}

export const volunteerApi = {
  // Get all volunteers with optional filters
  getVolunteers: async (filters: {
    skill?: string;
    location?: string;
    available?: boolean;
    language?: string;
    limit?: number;
  } = {}): Promise<VolunteersResponse> => {
    try {
      const response = await api.get('/api/volunteers', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      throw error;
    }
  },

  // Get specific volunteer by ID
  getVolunteer: async (id: number): Promise<Volunteer> => {
    try {
      const response = await api.get(`/api/volunteers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching volunteer ${id}:`, error);
      throw error;
    }
  },

  // Search by skill
  searchBySkill: async (skill: string, limit = 50): Promise<VolunteersResponse> => {
    try {
      const response = await api.get(`/api/volunteers/search/by-skill/${skill}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching by skill ${skill}:`, error);
      throw error;
    }
  },

  // Search by location
  searchByLocation: async (location: string, limit = 50): Promise<VolunteersResponse> => {
    try {
      const response = await api.get(`/api/volunteers/search/by-location/${location}`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching by location ${location}:`, error);
      throw error;
    }
  },

  // Get available volunteers
  getAvailableVolunteers: async (limit = 50): Promise<VolunteersResponse> => {
    try {
      const response = await api.get('/api/volunteers/available', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching available volunteers:', error);
      throw error;
    }
  },

  // Create new volunteer
  createVolunteer: async (volunteerData: Omit<Volunteer, 'id' | 'created_at' | 'updated_at'>): Promise<Volunteer> => {
    try {
      const response = await api.post('/api/volunteers', volunteerData);
      return response.data;
    } catch (error) {
      console.error('Error creating volunteer:', error);
      throw error;
    }
  },

  // Update volunteer
  updateVolunteer: async (id: number, volunteerData: Partial<Volunteer>): Promise<Volunteer> => {
    try {
      const response = await api.put(`/api/volunteers/${id}`, volunteerData);
      return response.data;
    } catch (error) {
      console.error(`Error updating volunteer ${id}:`, error);
      throw error;
    }
  },

  // Delete volunteer
  deleteVolunteer: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await api.delete(`/api/volunteers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting volunteer ${id}:`, error);
      throw error;
    }
  },

  // Update availability status
  updateAvailability: async (id: number, available: boolean): Promise<Volunteer> => {
    try {
      const response = await api.patch(
        `/api/volunteers/${id}/availability?available=${available}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating availability for ${id}:`, error);
      throw error;
    }
  },

  // Health check
  checkHealth: async (): Promise<{ status: string }> => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },
};

export default volunteerApi;