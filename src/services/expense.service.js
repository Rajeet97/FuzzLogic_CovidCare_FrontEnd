import axios from 'axios';
import authHeaderImage from './auth-header-image';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class ExpensesDataService {


  get(id) {
    return axios.get(API_URL + `/expenses/${id}`, { headers: authHeaderImage() });
  }

  getAll() {
    return axios.get(API_URL + '/expenses', { headers: authHeaderImage() });

  }

  create(data) {
    return axios.post(API_URL + "/expenses", data, { headers: authHeaderImage() });
  }

  update(id, data) {
    return axios.put(API_URL + `/expenses/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `/expenses/${id}`, { headers: authHeaderImage() });
  }


}

export default new ExpensesDataService();