import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class FAQDataService {
    getAll() {
    return axios.get(API_URL + '/faqs');

    }
  
    getAllbyVideo() {
      return axios.get(API_URL + '/faqs/video');
  
      }
  
      

    getAllByText() {
      return axios.get(API_URL + '/faqs/text');
  
      }
  
        

    get(id) {
      return axios.get(API_URL + `/faqs/${id}`,{ headers: authHeader() });
    }
  
    create(data) {
      return axios.post(API_URL + "/faqs", data,{ headers: authHeader() });
    }
  
    update(id, data) {
      return axios.put(API_URL + `/faqs/${id}`, data,{ headers: authHeader() });
    }
  
    delete(id) {
      return axios.delete(API_URL + `/faqs/${id}`,{ headers: authHeader() });
    }
  
    deleteAll() {
      return axios.delete(API_URL + `/faqs`,{ headers: authHeader() });
    }
  
 
  }
  
  export default new FAQDataService();