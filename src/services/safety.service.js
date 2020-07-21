import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class SafetyDataService {
    getAll() {
    return axios.get(API_URL + '/safetys');

    }
  
           

    get(id) {
      return axios.get(API_URL + `/safetys/${id}`,{ headers: authHeader() });
    }
  
    create(data) {
      return axios.post(API_URL + "/safetys", data,{ headers: authHeader() });
    }
  
    update(id, data) {
      return axios.put(API_URL + `/safetys/${id}`, data,{ headers: authHeader() });
    }
  
    delete(id) {
      return axios.delete(API_URL + `/safetys/${id}`,{ headers: authHeader() });
    }
  
    deleteAll() {
      return axios.delete(API_URL + `/safetys`,{ headers: authHeader() });
    }
  
 
  }
  
  export default new SafetyDataService();