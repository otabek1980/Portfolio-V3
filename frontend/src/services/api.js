import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Portfolio API
export const portfolioAPI = {
  // Get portfolio data
  getPortfolio: async () => {
    try {
      const response = await apiClient.get('/portfolio');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },

  // Update personal information
  updatePersonalInfo: async (personalInfo) => {
    try {
      const response = await apiClient.put('/portfolio/personal', personalInfo);
      return response.data;
    } catch (error) {
      console.error('Error updating personal info:', error);
      throw error;
    }
  },

  // Update skills
  updateSkills: async (skills) => {
    try {
      const response = await apiClient.put('/portfolio/skills', skills);
      return response.data;
    } catch (error) {
      console.error('Error updating skills:', error);
      throw error;
    }
  },
};

// Projects API
export const projectsAPI = {
  // Get all projects
  getProjects: async () => {
    try {
      const response = await apiClient.get('/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get project by ID
  getProject: async (id) => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  // Create new project
  createProject: async (project) => {
    try {
      const response = await apiClient.post('/projects', project);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update project
  updateProject: async (id, project) => {
    try {
      const response = await apiClient.put(`/projects/${id}`, project);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      const response = await apiClient.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Get projects by status
  getProjectsByStatus: async (status) => {
    try {
      const response = await apiClient.get(`/projects/filter/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects by status:', error);
      throw error;
    }
  },
};

// Contact API
export const contactAPI = {
  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Get all contact messages (admin)
  getContactMessages: async () => {
    try {
      const response = await apiClient.get('/contact');
      return response.data;
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  },

  // Get contact message by ID
  getContactMessage: async (id) => {
    try {
      const response = await apiClient.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact message:', error);
      throw error;
    }
  },

  // Update contact message (mark as read)
  updateContactMessage: async (id, updateData) => {
    try {
      const response = await apiClient.put(`/contact/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating contact message:', error);
      throw error;
    }
  },

  // Delete contact message
  deleteContactMessage: async (id) => {
    try {
      const response = await apiClient.delete(`/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw error;
    }
  },

  // Get unread messages count
  getUnreadCount: async () => {
    try {
      const response = await apiClient.get('/contact/unread/count');
      return response.data;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  },
};

// General API
export const generalAPI = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  },
};

export default apiClient;