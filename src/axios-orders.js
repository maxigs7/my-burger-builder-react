import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://max-burger-builder-default-rtdb.firebaseio.com/',
});

export default instance;
