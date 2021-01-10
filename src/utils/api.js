import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiContants';

export const login = async (username, password) => {
    const url = API_BASE_URL + '/login';
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
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};

export const search = async (key) => {
    const url = API_BASE_URL + '/search/' + key;
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};

export const getUserById = async (id) => {
    const url = API_BASE_URL + '/getuser/' + id;
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};

export const getAllMatch = async () => {
    const url = API_BASE_URL + '/listmatch';
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};

export const mathHistory = async (id) => {
    const url = API_BASE_URL + '/listmatchuser/' + id;
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};


export const block = async (id) => {
    const url = API_BASE_URL + '/blockuser';
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.put(url, {id: id}, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};


export const unblock = async (id) => {
    const url = API_BASE_URL + '/unblockuser';
    const data = {
        id: id
    }
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.put(url, data, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};




