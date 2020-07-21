import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class DonationDataService {
    getAll() {
    return axios.get(API_URL + '/donations',{ headers: authHeader() });

    }

    getAllByUser(username) {
      return axios.get(API_URL + `/donations/${username}`,{ headers: authHeader() });
  
      }

      getAllByUniqueValue() {
        return axios.get(API_URL + '/donations/unique',{ headers: authHeader() });
    
        }
  
      
    get(id) {
      return axios.get(API_URL + `/donations/${id}`,{ headers: authHeader() });
    }
  
    create(data) {
      return axios.post(API_URL + "/donations", data,{ headers: authHeader() });
    }
  
    update(id, data) {
      return axios.put(API_URL + `/donations/${id}`, data,{ headers: authHeader() });
    }
  
    delete(id) {
      return axios.delete(API_URL + `/donations/${id}`,{ headers: authHeader() });
    }
  
    deleteAll() {
      return axios.delete(API_URL + `/donations`,{ headers: authHeader() });
    }
  
 
  }
  
  export default new DonationDataService();