import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class DistrictDataService {
    getAll() {
    return axios.get(API_URL + '/districts');

    }
  
    get(id) {
      return axios.get(API_URL + `/districts/${id}`,{ headers: authHeader() });
    }
  
    create(data) {
      return axios.post(API_URL + "/districts", data,{ headers: authHeader() });
    }
  
    update(id, data) {
      return axios.put(API_URL + `/districts/${id}`, data,{ headers: authHeader() });
    }
  
    delete(id) {
      return axios.delete(API_URL + `/districts/${id}`,{ headers: authHeader() });
    }
  
    deleteAll() {
      return axios.delete(API_URL + `/districts`,{ headers: authHeader() });
    }
  
 
  }
  
  export default new DistrictDataService();