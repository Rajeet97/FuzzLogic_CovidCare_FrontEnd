import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class HelplineDataService {
    getAll() {
    return axios.get(API_URL + '/helplines',{ headers: authHeader() });

    }

    getAllByUser(username) {
      return axios.get(API_URL + `/helplines/${username}`,{ headers: authHeader() });
  
      }
  
    get(id) {
      return axios.get(API_URL + `/helplines/${id}`,{ headers: authHeader() });
    }
  
    create(data) {
      return axios.post(API_URL + "/helplines", data,{ headers: authHeader() });
    }
  
    update(id, data) {
      return axios.put(API_URL + `/helplines/${id}`, data,{ headers: authHeader() });
    }
  
    delete(id) {
      return axios.delete(API_URL + `/helplines/${id}`,{ headers: authHeader() });
    }
  
    deleteAll() {
      return axios.delete(API_URL + `/helplines`,{ headers: authHeader() });
    }
  
 
  }
  
  export default new HelplineDataService();