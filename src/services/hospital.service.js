import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class HospitalDataService {
    getAll() {
    return axios.get(API_URL + '/hospitals');

    }
  
    get(id) {
      return axios.get(API_URL + `/hospitals/${id}`,{ headers: authHeader() });
    }
  
    create(data) {
      return axios.post(API_URL + "/hospitals", data,{ headers: authHeader() });
    }
  
    update(id, data) {
      return axios.put(API_URL + `/hospitals/${id}`, data,{ headers: authHeader() });
    }
  
    delete(id) {
      return axios.delete(API_URL + `/hospitals/${id}`,{ headers: authHeader() });
    }
  
    deleteAll() {
      return axios.delete(API_URL + `/hospitals`,{ headers: authHeader() });
    }
  
 
  }
  
  export default new HospitalDataService();