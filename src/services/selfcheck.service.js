import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class SelfCheckDataService {
    getAll() {
    return axios.get(API_URL + '/selfchecks',{ headers: authHeader() });

    }

    getAllByUser(username) {
      return axios.get(API_URL + `/selfchecks/${username}`,{ headers: authHeader() });
  
      }
  
    get(id) {
      return axios.get(API_URL + `/selfchecks/${id}`,{ headers: authHeader() });
    }
  
    create(data) {
      return axios.post(API_URL + "/selfchecks", data,{ headers: authHeader() });
    }
  
    update(id, data) {
      return axios.put(API_URL + `/selfchecks/${id}`, data,{ headers: authHeader() });
    }
  
    delete(id) {
      return axios.delete(API_URL + `/selfchecks/${id}`,{ headers: authHeader() });
    }
  
    deleteAll() {
      return axios.delete(API_URL + `/selfchecks`,{ headers: authHeader() });
    }
  
 
  }
  
  export default new SelfCheckDataService();