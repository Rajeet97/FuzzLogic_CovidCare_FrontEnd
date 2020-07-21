import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const User_API_URL = 'http://localhost:8080/api';

class UserService { 
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getUserById(id) {
    return axios.get(User_API_URL + `/user/${id}`, { headers: authHeader() });
  }


  getUserUpdate(id,data) {
    return axios.put(User_API_URL + `/user/${id}`, data,{ headers: authHeader() });
  }
}

export default new UserService();
