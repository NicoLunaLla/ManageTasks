import axios from 'axios';

const API_URL = 'http://localhost:3001';

const db = {
  async findUserByEmail(email) {
    const res = await axios.get(`${API_URL}/users?email=${email}`);
    return res.data[0];
  },

  async findUserByUsername(username) {
    const res = await axios.get(`${API_URL}/users?username=${username}`);
    return res.data[0];
  },

  async validateLogin(identifier, password) {
    const res = await axios.get(`${API_URL}/users?${identifier.includes('@') ? 'email' : 'username'}=${identifier}`);
    const user = res.data[0];
    return user && user.password === password ? user : null;
  },

  async insertUser(user) {
    const res = await axios.post(`${API_URL}/users`, user);
    return res.data;
  }
};

export default db;
