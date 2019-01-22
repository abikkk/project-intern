import axios from 'axios'

const axiosWithHeader = axios.create({
    baseURL: '9f6a1eda.ngrok.io',
    headers:'token' + localStorage.getItem('')
  });

  export default axiosWithHeader