import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const db = {
  async findUserByEmail(email) {
    const res = await axios.get(`${API_ENDPOINTS.USERS}?email=${email}`);
    return res.data[0];
  },

  async findUserByUsername(username) {
    const res = await axios.get(`${API_ENDPOINTS.USERS}?username=${username}`);
    return res.data[0];
  },

  async validateLogin(identifier, password) {
    const res = await axios.get(`${API_ENDPOINTS.USERS}?${identifier.includes('@') ? 'email' : 'username'}=${identifier}`);
    const user = res.data[0];
    return user && user.password === password ? user : null;
  },

  async insertUser(user) {
    const res = await axios.post(API_ENDPOINTS.USERS, user);
    return res.data;
  },

  async getUsers() {
    const res = await axios.get(API_ENDPOINTS.USERS);
    return res.data;
  }
};

export default db;
