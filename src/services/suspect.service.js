import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class SuspectDataService {
    getAll() {
    return axios.get(API_URL + '/suspects',{ headers: authHeader() });

    }

    getAllByUser(username) {
      return axios.get(API_URL + `/suspects/${username}`,{ headers: authHeader() });
  
      }
  
    get(id) {
      return axios.get(API_URL + `/suspects/${id}`,{ headers: authHeader() });
    }
  
    create(data) {
      return axios.post(API_URL + "/suspects", data,{ headers: authHeader() });
    }
  
    update(id, data) {
      return axios.put(API_URL + `/suspects/${id}`, data,{ headers: authHeader() });
    }
  
    delete(id) {
      return axios.delete(API_URL + `/suspects/${id}`,{ headers: authHeader() });
    }
  
    deleteAll() {
      return axios.delete(API_URL + `/suspects`,{ headers: authHeader() });
    }
  
 
  }
  
  export default new SuspectDataService();