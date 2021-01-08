import axios from 'axios';
import { API_BASE_URL } from '../constants/apiContants';

export const login = async (username, password) => {
    const url = API_BASE_URL + '/auth/login';
    const data = {
        username: username,
        password: password
    }
    const res = await axios.post(url, data, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};

export const getAllUser = async () => {
    const url = API_BASE_URL + '/alluser';
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};

export const search = async (key) => {
    const url = API_BASE_URL + '/search/' + key;
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};

export const getUserById = async (id) => {
    const url = API_BASE_URL + '/getuser/' + id;
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};

export const listMatch = async () => {
    const url = API_BASE_URL + '/listmatch';
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};

export const mathHistory = async (id) => {
    const url = API_BASE_URL + '/listmatchuser/' + id;
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};


export const block = async (id) => {
    const url = API_BASE_URL + '/blockuser';
    const data = {
        id: id
    }
    const res = await axios.put(url, data, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};


export const unblock = async (id) => {
    const url = API_BASE_URL + '/unblockuser';
    const data = {
        id: id
    }
    const res = await axios.put(url, data, { 
        headers : {
            'Content-Type': 'application/json'
        }
    });
  return res;
};




