import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiContants';

export const login = async (username, password) => {
    const url = API_BASE_URL + '/admin/login';
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
    const url = API_BASE_URL + '/admin/alluser';
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
    const url = API_BASE_URL + '/admin/search/' + key;
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};

export const getUser = async (id) => {
    const url = API_BASE_URL + '/admin/getuser/' + id;
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
    const url = API_BASE_URL + '/admin/listmatch';
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};

export const matchHistory = async (id) => {
    const url = API_BASE_URL + '/admin/listmatchuser/' + id;
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': String(token)
        }
    });
  return res;
};

export const getMatchHistory = async (id) => {
    const url = API_BASE_URL + '/admin/match/' + id;
    const res = await axios.get(url, { 
        headers : {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem(ACCESS_TOKEN_NAME)
        }
    });
  return res;
}

export const block = async (id) => {
    const url = API_BASE_URL + '/admin/blockuser';
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




